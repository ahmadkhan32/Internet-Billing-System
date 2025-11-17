/**
 * Ensure default users exist in the database
 * This is called automatically in serverless mode when needed
 */

const User = require('../models/User');

const ensureDefaultUsers = async () => {
  try {
    const defaultUsers = [
      {
        name: 'Super Admin',
        email: 'admin@billing.com',
        password: 'admin123',
        role: 'super_admin',
        isp_id: null
      },
      {
        name: 'ISP Admin',
        email: 'ispadmin@billing.com',
        password: 'admin123',
        role: 'admin',
        isp_id: null
      },
      {
        name: 'Account Manager',
        email: 'accountmanager@billing.com',
        password: 'admin123',
        role: 'account_manager',
        isp_id: null
      },
      {
        name: 'Technical Officer',
        email: 'technical@billing.com',
        password: 'admin123',
        role: 'technical_officer',
        isp_id: null
      },
      {
        name: 'Recovery Officer',
        email: 'recovery@billing.com',
        password: 'admin123',
        role: 'recovery_officer',
        isp_id: null
      },
      {
        name: 'Test Customer',
        email: 'customer@billing.com',
        password: 'admin123',
        role: 'customer',
        isp_id: null
      }
    ];

    let createdCount = 0;
    for (const userData of defaultUsers) {
      const existingUser = await User.findOne({ where: { email: userData.email } });
      if (!existingUser) {
        try {
          await User.create({
            ...userData,
            is_active: true
          });
          createdCount++;
          console.log(`✅ Created default user: ${userData.email} (${userData.role})`);
        } catch (error) {
          console.error(`❌ Error creating default user ${userData.email}:`, error.message);
        }
      }
    }

    if (createdCount > 0) {
      console.log(`✅ Created ${createdCount} default user(s) in serverless mode`);
    }

    return { success: true, created: createdCount };
  } catch (error) {
    console.error('❌ Error ensuring default users:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = ensureDefaultUsers;

