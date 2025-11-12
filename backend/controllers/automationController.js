/**
 * Automation Controller
 * Handles subscription lifecycle, auto-invoice generation, and business suspension/reactivation
 */

const { ISP, SaaSPackage, Bill, Customer, Notification, User, AutomationLog } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');
const generateInvoicePDF = require('../utils/generateInvoice');
const sendEmailUtil = require('../utils/sendEmail');
const { sendEmail } = sendEmailUtil;
const { sendSMS } = require('../utils/smsService');
const createActivityLog = require('../utils/activityLogger');

/**
 * Check for subscriptions expiring in 3 days and send reminders
 */
const checkExpiringSubscriptions = async (req, res) => {
  try {
    const triggeredBy = req?.body?.triggered_by || 'cron';
    const logResults = [];

    console.log('🔔 Checking for expiring subscriptions (3 days)...');

    const threeDaysFromNow = moment().add(3, 'days').endOf('day').toDate();
    const today = moment().startOf('day').toDate();

    const expiringISPs = await ISP.findAll({
      where: {
        subscription_status: 'active',
        subscription_end_date: {
          [Op.between]: [today, threeDaysFromNow]
        }
      },
      include: [
        {
          model: SaaSPackage,
          as: 'saasPackage',
          attributes: ['id', 'name', 'price', 'duration'],
          required: false
        }
      ]
    });

    let remindersSent = 0;

    for (const isp of expiringISPs) {
      try {
        // Check if reminder already sent today
        const existingReminder = await AutomationLog.findOne({
          where: {
            type: 'subscription_expiry_reminder',
            business_id: isp.id,
            status: 'success',
            createdAt: {
              [Op.gte]: moment().startOf('day').toDate()
            }
          }
        });

        if (existingReminder) {
          console.log(`   ⏭️  Reminder already sent today for ${isp.name}`);
          continue;
        }

        // Find Business Admin user
        const adminUser = await User.findOne({
          where: {
            email: isp.email,
            role: 'admin',
            isp_id: isp.id
          }
        });

        // Create notification
        const expiryDate = moment(isp.subscription_end_date).format('MMM DD, YYYY');
        const message = `Your subscription for ${isp.saasPackage?.name || 'package'} expires on ${expiryDate}. Please renew to avoid service interruption.`;

        await Notification.create({
          user_id: adminUser?.id || null,
          type: 'system',
          title: 'Subscription Expiring Soon',
          message: message,
          channel: 'both',
          isp_id: isp.id,
          scheduled_at: new Date()
        });

        // Send email to Business Admin
        if (isp.email) {
          try {
            const emailSubject = `Subscription Expiring Soon - ${isp.name}`;
            const emailBody = `
Dear ${isp.name} Admin,

Your SaaS subscription is expiring in 3 days.

Subscription Details:
- Package: ${isp.saasPackage?.name || 'N/A'}
- Expiry Date: ${expiryDate}
- Business ID: ${isp.business_id || 'N/A'}

Please renew your subscription to continue using our services without interruption.

To renew, please contact support or make a payment through your dashboard.

Best regards,
Internet Billing System
            `;

            await sendEmail(isp.email, emailSubject, emailBody);
            console.log(`   📧 Expiry reminder email sent to ${isp.email}`);
          } catch (error) {
            console.error(`   ❌ Error sending email to ${isp.email}:`, error.message);
          }
        }

        // Log automation
        await AutomationLog.create({
          type: 'subscription_expiry_reminder',
          business_id: isp.id,
          status: 'success',
          message: `Expiry reminder sent for ${isp.name}`,
          triggered_by: triggeredBy,
          triggered_at: new Date(),
          metadata: {
            expiry_date: isp.subscription_end_date,
            package_name: isp.saasPackage?.name
          }
        });

        remindersSent++;
        logResults.push({
          business: isp.name,
          business_id: isp.business_id,
          expiry_date: expiryDate,
          status: 'reminder_sent'
        });

        console.log(`   ✅ Reminder sent for ${isp.name} (expires: ${expiryDate})`);
      } catch (error) {
        console.error(`   ❌ Error processing ${isp.name}:`, error.message);
        
        await AutomationLog.create({
          type: 'subscription_expiry_reminder',
          business_id: isp.id,
          status: 'failed',
          message: `Failed to send expiry reminder`,
          error_message: error.message,
          triggered_by: triggeredBy,
          triggered_at: new Date()
        });
      }
    }

    console.log(`✅ Expiry reminders sent: ${remindersSent}`);

    if (res) {
      res.json({
        success: true,
        message: `Expiry reminders processed`,
        reminders_sent: remindersSent,
        results: logResults
      });
    }

    return { remindersSent, results: logResults };
  } catch (error) {
    console.error('❌ Error checking expiring subscriptions:', error);
    
    if (res) {
      res.status(500).json({ 
        success: false,
        message: 'Error checking expiring subscriptions', 
        error: error.message 
      });
    }
    
    throw error;
  }
};

/**
 * Suspend expired businesses
 */
const suspendExpiredBusinesses = async (req, res) => {
  try {
    const triggeredBy = req?.body?.triggered_by || 'cron';
    const logResults = [];

    console.log('⏸️  Checking for expired subscriptions...');

    const today = moment().startOf('day').toDate();

    const expiredISPs = await ISP.findAll({
      where: {
        subscription_status: 'active',
        subscription_end_date: {
          [Op.lt]: today
        }
      },
      include: [
        {
          model: SaaSPackage,
          as: 'saasPackage',
          attributes: ['id', 'name', 'price'],
          required: false
        }
      ]
    });

    let suspended = 0;

    for (const isp of expiredISPs) {
      try {
        // Update ISP status to expired/suspended
        await isp.update({
          subscription_status: 'expired'
        });

        // Find Business Admin user
        const adminUser = await User.findOne({
          where: {
            email: isp.email,
            role: 'admin',
            isp_id: isp.id
          }
        });

        // Create notification for Business Admin
        await Notification.create({
          user_id: adminUser?.id || null,
          type: 'system',
          title: 'Subscription Expired - Business Suspended',
          message: `Your subscription has expired. Your business account has been suspended. Please renew to reactivate.`,
          channel: 'both',
          isp_id: isp.id,
          scheduled_at: new Date()
        });

        // Send email to Business Admin
        if (isp.email) {
          try {
            const emailSubject = `Subscription Expired - ${isp.name} Suspended`;
            const emailBody = `
Dear ${isp.name} Admin,

Your SaaS subscription has expired and your business account has been suspended.

Subscription Details:
- Package: ${isp.saasPackage?.name || 'N/A'}
- Expiry Date: ${moment(isp.subscription_end_date).format('MMM DD, YYYY')}
- Business ID: ${isp.business_id || 'N/A'}

Your account is now suspended. To reactivate:
1. Renew your subscription
2. Make payment
3. Contact support if needed

Best regards,
Internet Billing System
            `;

            await sendEmail(isp.email, emailSubject, emailBody);
            console.log(`   📧 Suspension email sent to ${isp.email}`);
          } catch (error) {
            console.error(`   ❌ Error sending email to ${isp.email}:`, error.message);
          }
        }

        // Notify Super Admin
        const superAdmin = await User.findOne({
          where: { role: 'super_admin' }
        });

        if (superAdmin) {
          await Notification.create({
            user_id: superAdmin.id,
            type: 'system',
            title: `Business Suspended: ${isp.name}`,
            message: `Business ${isp.name} (${isp.business_id}) subscription has expired and been suspended.`,
            channel: 'in_app',
            isp_id: null, // System notification
            scheduled_at: new Date()
          });
        }

        // Log automation
        await AutomationLog.create({
          type: 'business_suspended',
          business_id: isp.id,
          status: 'success',
          message: `Business ${isp.name} suspended due to expired subscription`,
          triggered_by: triggeredBy,
          triggered_at: new Date(),
          metadata: {
            expiry_date: isp.subscription_end_date,
            package_name: isp.saasPackage?.name
          }
        });

        suspended++;
        logResults.push({
          business: isp.name,
          business_id: isp.business_id,
          expiry_date: moment(isp.subscription_end_date).format('MMM DD, YYYY'),
          status: 'suspended'
        });

        console.log(`   ✅ Suspended ${isp.name} (expired: ${moment(isp.subscription_end_date).format('MMM DD, YYYY')})`);
      } catch (error) {
        console.error(`   ❌ Error suspending ${isp.name}:`, error.message);
        
        await AutomationLog.create({
          type: 'business_suspended',
          business_id: isp.id,
          status: 'failed',
          message: `Failed to suspend business`,
          error_message: error.message,
          triggered_by: triggeredBy,
          triggered_at: new Date()
        });
      }
    }

    console.log(`✅ Suspended ${suspended} expired businesses`);

    if (res) {
      res.json({
        success: true,
        message: `Expired businesses processed`,
        suspended: suspended,
        results: logResults
      });
    }

    return { suspended, results: logResults };
  } catch (error) {
    console.error('❌ Error suspending expired businesses:', error);
    
    if (res) {
      res.status(500).json({ 
        success: false,
        message: 'Error suspending expired businesses', 
        error: error.message 
      });
    }
    
    throw error;
  }
};

/**
 * Generate auto-invoice when subscription starts
 */
const generateSubscriptionInvoice = async (ispId, triggeredBy = 'api') => {
  try {
    const isp = await ISP.findByPk(ispId, {
      include: [
        {
          model: SaaSPackage,
          as: 'saasPackage',
          attributes: ['id', 'name', 'price', 'duration'],
          required: false
        }
      ]
    });

    if (!isp || !isp.saasPackage) {
      throw new Error('ISP or SaaS package not found');
    }

    // Generate invoice for SaaS subscription
    const invoiceAmount = parseFloat(isp.saasPackage.price);
    const billNumber = `SAAS-${isp.business_id || isp.id}-${Date.now()}`;

    const bill = await Bill.create({
      bill_number: billNumber,
      customer_id: null, // SaaS invoice, not customer invoice
      package_id: null,
      amount: invoiceAmount,
      total_amount: invoiceAmount,
      paid_amount: 0,
      late_fee: 0,
      due_date: moment().add(7, 'days').toDate(),
      billing_period_start: isp.subscription_start_date || new Date(),
      billing_period_end: isp.subscription_end_date || moment().add(isp.saasPackage.duration || 1, 'months').toDate(),
      status: 'pending',
      notes: `SaaS Subscription Invoice for ${isp.saasPackage.name} package`,
      isp_id: isp.id
    });

    // Generate PDF invoice (for SaaS subscription, customer/package may be null)
    try {
      // Create a minimal customer object for PDF generation
      const saasCustomer = {
        name: isp.name,
        address: isp.address || 'N/A',
        phone: isp.contact || 'N/A',
        email: isp.email || 'N/A'
      };
      const saasPackage = {
        name: isp.saasPackage?.name || 'SaaS Subscription',
        price: invoiceAmount,
        speed: 'N/A'
      };
      const { filePath } = await generateInvoicePDF(bill, saasCustomer, saasPackage, isp);
      console.log(`   📄 Invoice PDF generated: ${filePath}`);
    } catch (error) {
      console.error(`   ⚠️  Error generating PDF:`, error.message);
    }

    // Create notification
    const adminUser = await User.findOne({
      where: {
        email: isp.email,
        role: 'admin',
        isp_id: isp.id
      }
    });

    await Notification.create({
      user_id: adminUser?.id || null,
      type: 'bill_generated',
      title: 'SaaS Subscription Invoice Generated',
      message: `Your subscription invoice ${billNumber} has been generated. Amount: PKR ${invoiceAmount.toFixed(2)}. Due date: ${moment(bill.due_date).format('MMM DD, YYYY')}.`,
      channel: 'both',
      bill_id: bill.id,
      isp_id: isp.id,
      scheduled_at: new Date()
    });

    // Send email
    if (isp.email) {
      try {
        const emailSubject = `SaaS Subscription Invoice - ${isp.name}`;
        const emailBody = `
Dear ${isp.name} Admin,

Your SaaS subscription invoice has been generated.

Invoice Details:
- Invoice Number: ${billNumber}
- Package: ${isp.saasPackage.name}
- Amount: PKR ${invoiceAmount.toFixed(2)}
- Due Date: ${moment(bill.due_date).format('MMM DD, YYYY')}
- Period: ${moment(bill.billing_period_start).format('MMM DD, YYYY')} - ${moment(bill.billing_period_end).format('MMM DD, YYYY')}

Please make payment before the due date to continue using our services.

Best regards,
Internet Billing System
        `;

        await sendEmail(isp.email, emailSubject, emailBody);
      } catch (error) {
        console.error(`   ❌ Error sending email:`, error.message);
      }
    }

    // Log automation
    await AutomationLog.create({
      type: 'auto_invoice_generated',
      business_id: isp.id,
      invoice_id: bill.id,
      status: 'success',
      message: `Auto-generated subscription invoice for ${isp.name}`,
      triggered_by: triggeredBy,
      triggered_at: new Date(),
      metadata: {
        invoice_number: billNumber,
        amount: invoiceAmount,
        package_name: isp.saasPackage.name
      }
    });

    console.log(`✅ Subscription invoice generated for ${isp.name}: ${billNumber}`);

    return bill;
  } catch (error) {
    console.error('❌ Error generating subscription invoice:', error);
    
    await AutomationLog.create({
      type: 'auto_invoice_generated',
      business_id: ispId,
      status: 'failed',
      message: `Failed to generate subscription invoice`,
      error_message: error.message,
      triggered_by: triggeredBy,
      triggered_at: new Date()
    });
    
    throw error;
  }
};

/**
 * Reactivate business after renewal payment
 */
const reactivateBusiness = async (ispId, triggeredBy = 'api') => {
  try {
    const isp = await ISP.findByPk(ispId, {
      include: [
        {
          model: SaaSPackage,
          as: 'saasPackage',
          attributes: ['id', 'name', 'price', 'duration'],
          required: false
        }
      ]
    });

    if (!isp) {
      throw new Error('ISP not found');
    }

    if (isp.subscription_status !== 'expired' && isp.subscription_status !== 'suspended') {
      return { message: 'Business is not suspended', isp };
    }

    // Extend subscription end date if needed
    let newEndDate = isp.subscription_end_date;
    if (!newEndDate || moment(newEndDate).isBefore(moment())) {
      newEndDate = moment().add(isp.saasPackage?.duration || 1, 'months').toDate();
    }

    // Reactivate business
    await isp.update({
      subscription_status: 'active',
      subscription_start_date: isp.subscription_start_date || new Date(),
      subscription_end_date: newEndDate
    });

    // Find Business Admin user
    const adminUser = await User.findOne({
      where: {
        email: isp.email,
        role: 'admin',
        isp_id: isp.id
      }
    });

    // Create notification
    await Notification.create({
      user_id: adminUser?.id || null,
      type: 'system',
      title: 'Business Reactivated',
      message: `Your business account has been reactivated. Subscription valid until ${moment(newEndDate).format('MMM DD, YYYY')}.`,
      channel: 'both',
      isp_id: isp.id,
      scheduled_at: new Date()
    });

    // Send email
    if (isp.email) {
      try {
        const emailSubject = `Business Reactivated - ${isp.name}`;
        const emailBody = `
Dear ${isp.name} Admin,

Your business account has been successfully reactivated!

Subscription Details:
- Package: ${isp.saasPackage?.name || 'N/A'}
- Status: Active
- Valid Until: ${moment(newEndDate).format('MMM DD, YYYY')}
- Business ID: ${isp.business_id || 'N/A'}

Your account is now fully operational. Thank you for your renewal!

Best regards,
Internet Billing System
        `;

        await sendEmail(isp.email, emailSubject, emailBody);
      } catch (error) {
        console.error(`   ❌ Error sending email:`, error.message);
      }
    }

    // Log automation
    await AutomationLog.create({
      type: 'business_reactivated',
      business_id: isp.id,
      status: 'success',
      message: `Business ${isp.name} reactivated after renewal`,
      triggered_by: triggeredBy,
      triggered_at: new Date(),
      metadata: {
        new_end_date: newEndDate,
        package_name: isp.saasPackage?.name
      }
    });

    console.log(`✅ Business reactivated: ${isp.name}`);

    return isp;
  } catch (error) {
    console.error('❌ Error reactivating business:', error);
    
    await AutomationLog.create({
      type: 'business_reactivated',
      business_id: ispId,
      status: 'failed',
      message: `Failed to reactivate business`,
      error_message: error.message,
      triggered_by: triggeredBy,
      triggered_at: new Date()
    });
    
    throw error;
  }
};

/**
 * Generate invoice when customer installation is completed
 */
const generateInstallationInvoice = async (customerId, installationId, triggeredBy = 'api') => {
  try {
    const customer = await Customer.findByPk(customerId, {
      include: [
        {
          model: Package,
          as: 'package',
          attributes: ['id', 'name', 'price', 'speed']
        },
        {
          model: ISP,
          as: 'isp',
          attributes: ['id', 'name', 'email', 'business_id']
        }
      ]
    });

    if (!customer || !customer.package) {
      throw new Error('Customer or package not found');
    }

    // Generate installation invoice
    const invoiceAmount = parseFloat(customer.package.price);
    const billNumber = `INST-${customer.isp.business_id || customer.isp.id}-${customer.id}-${Date.now()}`;

    const bill = await Bill.create({
      bill_number: billNumber,
      customer_id: customer.id,
      package_id: customer.package_id,
      amount: invoiceAmount,
      total_amount: invoiceAmount,
      paid_amount: 0,
      late_fee: 0,
      due_date: moment().add(7, 'days').toDate(),
      billing_period_start: new Date(),
      billing_period_end: moment().add(1, 'month').toDate(),
      status: 'pending',
      notes: `Installation invoice for ${customer.package.name} connection`,
      isp_id: customer.isp_id
    });

    // Generate PDF invoice
    try {
      const { filePath } = await generateInvoicePDF(bill, customer, customer.package, customer.isp);
      console.log(`   📄 Installation invoice PDF generated: ${filePath}`);
    } catch (error) {
      console.error(`   ⚠️  Error generating PDF:`, error.message);
    }

    // Create notifications
    const customerUser = await User.findOne({
      where: {
        email: customer.email,
        role: 'customer'
      }
    });

    // Notify customer
    await Notification.create({
      user_id: customerUser?.id || null,
      customer_id: customer.id,
      bill_id: bill.id,
      type: 'bill_generated',
      title: 'Installation Invoice Generated',
      message: `Your installation invoice ${billNumber} has been generated. Amount: PKR ${invoiceAmount.toFixed(2)}.`,
      channel: 'both',
      isp_id: customer.isp_id,
      scheduled_at: new Date()
    });

    // Notify Business Admin
    const adminUser = await User.findOne({
      where: {
        email: customer.isp.email,
        role: 'admin',
        isp_id: customer.isp_id
      }
    });

    await Notification.create({
      user_id: adminUser?.id || null,
      customer_id: customer.id,
      bill_id: bill.id,
      type: 'bill_generated',
      title: 'New Installation Invoice',
      message: `Installation invoice ${billNumber} generated for customer ${customer.name}. Amount: PKR ${invoiceAmount.toFixed(2)}.`,
      channel: 'in_app',
      isp_id: customer.isp_id,
      scheduled_at: new Date()
    });

    // Send emails
    if (customer.email) {
      try {
        await sendEmail(
          customer.email,
          'Installation Invoice Generated',
          `Dear ${customer.name},\n\nYour installation invoice ${billNumber} has been generated.\nAmount: PKR ${invoiceAmount.toFixed(2)}\nDue Date: ${moment(bill.due_date).format('MMM DD, YYYY')}\n\nThank you!`
        );
      } catch (error) {
        console.error(`   ❌ Error sending email to customer:`, error.message);
      }
    }

    // Log automation
    await AutomationLog.create({
      type: 'installation_invoice',
      business_id: customer.isp_id,
      customer_id: customer.id,
      invoice_id: bill.id,
      status: 'success',
      message: `Installation invoice generated for ${customer.name}`,
      triggered_by: triggeredBy,
      triggered_at: new Date(),
      metadata: {
        invoice_number: billNumber,
        amount: invoiceAmount,
        package_name: customer.package.name
      }
    });

    console.log(`✅ Installation invoice generated for ${customer.name}: ${billNumber}`);

    return bill;
  } catch (error) {
    console.error('❌ Error generating installation invoice:', error);
    
    await AutomationLog.create({
      type: 'installation_invoice',
      customer_id: customerId,
      status: 'failed',
      message: `Failed to generate installation invoice`,
      error_message: error.message,
      triggered_by: triggeredBy,
      triggered_at: new Date()
    });
    
    throw error;
  }
};

/**
 * Get automation logs
 */
const getAutomationLogs = async (req, res) => {
  try {
    const { type, status, business_id, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (type) whereClause.type = type;
    if (status) whereClause.status = status;
    if (business_id) whereClause.business_id = business_id;

    // Super Admin can see all, others only their business
    if (req.user.role !== 'super_admin' && req.user.isp_id) {
      whereClause.business_id = req.user.isp_id;
    }

    const logs = await AutomationLog.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: ISP,
          as: 'business',
          attributes: ['id', 'name', 'business_id'],
          required: false
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name', 'email'],
          required: false
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      logs: logs.rows,
      total: logs.count,
      page: parseInt(page),
      pages: Math.ceil(logs.count / limit)
    });
  } catch (error) {
    console.error('Error fetching automation logs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Generate invoice when subscription ends/expires
 */
const generateSubscriptionEndInvoice = async (ispId, triggeredBy = 'api') => {
  try {
    const isp = await ISP.findByPk(ispId, {
      include: [
        {
          model: SaaSPackage,
          as: 'saasPackage',
          attributes: ['id', 'name', 'price', 'duration'],
          required: false
        }
      ]
    });

    if (!isp || !isp.saasPackage) {
      throw new Error('ISP or SaaS package not found');
    }

    // Check if end invoice already generated (avoid duplicates)
    const existingEndInvoice = await Bill.findOne({
      where: {
        isp_id: isp.id,
        customer_id: null,
        notes: {
          [Op.like]: '%Subscription End Invoice%'
        },
        billing_period_end: isp.subscription_end_date
      }
    });

    if (existingEndInvoice) {
      console.log(`⚠️  Subscription end invoice already exists for ISP ${ispId}`);
      return existingEndInvoice;
    }

    // Generate final invoice for subscription period
    const invoiceAmount = parseFloat(isp.saasPackage.price);
    const billNumber = `SAAS-END-${isp.business_id || isp.id}-${Date.now()}`;

    const bill = await Bill.create({
      bill_number: billNumber,
      customer_id: null, // SaaS invoice, not customer invoice
      package_id: null,
      amount: invoiceAmount,
      total_amount: invoiceAmount,
      paid_amount: 0,
      late_fee: 0,
      due_date: isp.subscription_end_date || moment().add(7, 'days').toDate(),
      billing_period_start: isp.subscription_start_date || new Date(),
      billing_period_end: isp.subscription_end_date || new Date(),
      status: 'pending',
      notes: `Subscription End Invoice for ${isp.saasPackage.name} package - Final invoice for subscription period`,
      isp_id: isp.id
    });

    // Generate PDF invoice
    try {
      const saasCustomer = {
        name: isp.name,
        address: isp.address || 'N/A',
        phone: isp.contact || 'N/A',
        email: isp.email || 'N/A'
      };
      const saasPackage = {
        name: isp.saasPackage?.name || 'SaaS Subscription',
        price: invoiceAmount,
        speed: 'N/A'
      };
      const { filePath } = await generateInvoicePDF(bill, saasCustomer, saasPackage, isp);
      console.log(`   📄 Subscription end invoice PDF generated: ${filePath}`);
    } catch (error) {
      console.error(`   ⚠️  Error generating PDF:`, error.message);
    }

    // Create notification
    const adminUser = await User.findOne({
      where: {
        email: isp.email,
        role: 'admin',
        isp_id: isp.id
      }
    });

    await Notification.create({
      user_id: adminUser?.id || null,
      type: 'bill_generated',
      title: 'Subscription End Invoice Generated',
      message: `Your subscription end invoice ${billNumber} has been generated. Amount: PKR ${invoiceAmount.toFixed(2)}. This is the final invoice for your subscription period.`,
      channel: 'both',
      bill_id: bill.id,
      isp_id: isp.id,
      scheduled_at: new Date()
    });

    // Send email notification
    if (isp.email) {
      try {
        const subject = `Subscription End Invoice - ${isp.name}`;
        const text = `
          Dear ${isp.name} Admin,
          
          Your subscription has ended and a final invoice has been generated.
          
          Invoice Number: ${billNumber}
          Amount: PKR ${invoiceAmount.toFixed(2)}
          Period: ${moment(isp.subscription_start_date).format('MMM DD, YYYY')} to ${moment(isp.subscription_end_date).format('MMM DD, YYYY')}
          
          Please make payment to reactivate your subscription.
          
          Thank you!
        `;
        await sendEmail(isp.email, subject, text);
      } catch (error) {
        console.error(`Error sending subscription end email:`, error);
      }
    }

    // Log automation
    await AutomationLog.create({
      business_id: isp.id,
      action: 'GENERATE_SUBSCRIPTION_END_INVOICE',
      status: 'success',
      triggered_by: triggeredBy,
      message: `Subscription end invoice ${billNumber} generated for ${isp.name}`,
      metadata: JSON.stringify({
        isp_id: isp.id,
        bill_id: bill.id,
        amount: invoiceAmount
      })
    });

    console.log(`✅ Subscription end invoice generated: ${billNumber} for ISP ${ispId}`);
    return bill;
  } catch (error) {
    console.error(`❌ Error generating subscription end invoice:`, error);
    
    // Log failure
    try {
      await AutomationLog.create({
        business_id: ispId,
        action: 'GENERATE_SUBSCRIPTION_END_INVOICE',
        status: 'failed',
        triggered_by: triggeredBy,
        message: `Failed to generate subscription end invoice: ${error.message}`,
        metadata: JSON.stringify({ error: error.message })
      });
    } catch (logError) {
      console.error('Error logging automation failure:', logError);
    }
    
    throw error;
  }
};

module.exports = {
  checkExpiringSubscriptions,
  suspendExpiredBusinesses,
  generateSubscriptionInvoice,
  generateSubscriptionEndInvoice,
  reactivateBusiness,
  generateInstallationInvoice,
  getAutomationLogs
};

