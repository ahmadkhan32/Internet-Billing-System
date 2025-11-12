const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { sequelize, testConnection } = require('./config/db');
const { User, ISP, Customer, Package, Bill, Payment, Recovery, Installation, Notification, ActivityLog } = require('./models');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const billingRoutes = require('./routes/billingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const recoveryRoutes = require('./routes/recoveryRoutes');
const reportRoutes = require('./routes/reportRoutes');
const packageRoutes = require('./routes/packageRoutes');
const installationRoutes = require('./routes/installationRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const activityLogRoutes = require('./routes/activityLogRoutes');
const ispRoutes = require('./routes/ispRoutes');
const { initializeScheduler } = require('./utils/monthlyScheduler');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL] 
  : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in development
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for invoice downloads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/bills', billingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/recoveries', recoveryRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/installations', installationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/activity-logs', activityLogRoutes);
app.use('/api/isps', ispRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Sync database and start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    // Sync database models (create tables if they don't exist)
    // In production, use migrations instead
    if (process.env.NODE_ENV !== 'production') {
      try {
        // Use sequelize.sync() which handles dependencies automatically
        // force: false = don't drop existing tables
        // alter: true = update table structure if needed (fixes schema mismatches)
        await sequelize.sync({ alter: true, force: false });
        console.log('✅ Database models synchronized');
        
        // Automatically fix packages table to allow null isp_id
        try {
          const [results] = await sequelize.query(`
            SELECT COLUMN_NAME, IS_NULLABLE 
            FROM information_schema.COLUMNS 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'packages' 
            AND COLUMN_NAME = 'isp_id'
          `);
          
          if (results.length > 0 && results[0].IS_NULLABLE === 'NO') {
            await sequelize.query(`
              ALTER TABLE packages 
              MODIFY COLUMN isp_id INT NULL
            `);
            console.log('✅ Fixed packages table: isp_id now allows NULL');
          }
        } catch (alterError) {
          // Ignore - might already be correct or table doesn't exist
        }
      } catch (syncError) {
        // If sync fails, try creating tables individually in order
        console.log('⚠️  Standard sync failed, trying individual table creation...');
        try {
          await ISP.sync({ alter: true, force: false });
          await User.sync({ alter: true, force: false });
          await Package.sync({ alter: true, force: false });
          await Customer.sync({ alter: true, force: false });
          await Bill.sync({ alter: true, force: false });
          await Payment.sync({ alter: true, force: false });
          await Recovery.sync({ alter: true, force: false });
          await Installation.sync({ alter: true, force: false });
          await Notification.sync({ alter: true, force: false });
          await ActivityLog.sync({ alter: true, force: false });
          console.log('✅ Database models synchronized (individual sync)');
          
          // Automatically fix packages table after sync
          try {
            const [results] = await sequelize.query(`
              SELECT COLUMN_NAME, IS_NULLABLE 
              FROM information_schema.COLUMNS 
              WHERE TABLE_SCHEMA = DATABASE() 
              AND TABLE_NAME = 'packages' 
              AND COLUMN_NAME = 'isp_id'
            `);
            
            if (results.length > 0 && results[0].IS_NULLABLE === 'NO') {
              await sequelize.query(`
                ALTER TABLE packages 
                MODIFY COLUMN isp_id INT NULL
              `);
              console.log('✅ Fixed packages table: isp_id now allows NULL');
            }
          } catch (alterError) {
            // Ignore - might already be correct
          }
        } catch (individualError) {
          console.error('❌ Error syncing database:', individualError.message);
          // Continue anyway - tables might already exist
          console.log('⚠️  Continuing with existing tables...');
          console.log('💡 Tip: Run "node backend/utils/fixDatabase.js" to fix schema issues');
        }
      }
    }

    // Check JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.warn('⚠️  WARNING: JWT_SECRET is not set in environment variables. Please set it in .env file.');
      console.warn('⚠️  Authentication will fail without JWT_SECRET.');
    }

    // Create default ISPs if they don't exist
    console.log('🌐 Creating default ISPs...');
    const defaultISPs = [
      {
        name: 'ISP 1',
        email: 'isp1@example.com',
        contact: '+1234567890',
        subscription_plan: 'premium',
        subscription_status: 'active'
      },
      {
        name: 'ISP 2',
        email: 'isp2@example.com',
        contact: '+1234567891',
        subscription_plan: 'basic',
        subscription_status: 'active'
      }
    ];

    for (const ispData of defaultISPs) {
      const existingISP = await ISP.findOne({ where: { email: ispData.email } });
      if (!existingISP) {
        try {
          const isp = await ISP.create(ispData);
          console.log(`   ✅ Created ISP: ${isp.name} (ID: ${isp.id})`);
        } catch (error) {
          console.error(`   ❌ Error creating ISP ${ispData.name}:`, error.message);
        }
      } else {
        console.log(`   ℹ️  ISP already exists: ${ispData.name}`);
      }
    }

    // Create default users for all roles if they don't exist
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
        isp_id: null // Will be assigned when ISP is created
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

    console.log('🔐 Creating default users...');
    for (const userData of defaultUsers) {
      const existingUser = await User.findOne({ where: { email: userData.email } });
      if (!existingUser) {
        try {
          await User.create({
            ...userData,
            is_active: true
          });
          console.log(`✅ Created ${userData.role}: ${userData.email} / admin123`);
        } catch (error) {
          console.error(`❌ Error creating ${userData.role}:`, error.message);
        }
      } else {
        console.log(`✅ ${userData.role} already exists: ${userData.email}`);
      }
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Default Login Credentials:');
    console.log('   All users use password: admin123');
    console.log('   Super Admin: admin@billing.com');
    console.log('   ISP Admin: ispadmin@billing.com');
    console.log('   Account Manager: accountmanager@billing.com');
    console.log('   Technical Officer: technical@billing.com');
    console.log('   Recovery Officer: recovery@billing.com');
    console.log('   Customer: customer@billing.com');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Initialize monthly scheduler
    initializeScheduler();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await sequelize.close();
  process.exit(0);
});

