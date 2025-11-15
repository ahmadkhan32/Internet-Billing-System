const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { sequelize, testConnection } = require('./config/db');

// Load models - must always succeed for routes to work
// Models don't connect to database until used, so they can be loaded safely
const models = require('./models');
const { User, ISP, Customer, Package, Bill, Payment, Recovery, Installation, Notification, ActivityLog, Role, Permission } = models;

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
const superAdminRoutes = require('./routes/superAdminRoutes');
const saaSPackageRoutes = require('./routes/saaSPackageRoutes');
const roleRoutes = require('./routes/roleRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const automationRoutes = require('./routes/automationRoutes');
const { initializeScheduler } = require('./utils/monthlyScheduler');
const initializeRBAC = require('./utils/initializeRBAC');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL] 
  : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'];

// Add Vercel URL to allowed origins if in Vercel environment
if (process.env.VERCEL_URL) {
  allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
}
if (process.env.VERCEL) {
  // Allow all Vercel preview and production URLs
  allowedOrigins.push(/^https:\/\/.*\.vercel\.app$/);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin matches allowed origins
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return allowed === origin;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      // In development or Vercel, allow all origins
      if (process.env.NODE_ENV !== 'production' || process.env.VERCEL) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for invoice downloads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection check middleware for serverless (before routes)
// Only check on first request, allow routes to handle their own errors
if (process.env.VERCEL) {
  let dbConnectionChecked = false;
  let dbConnectionStatus = null;
  
  app.use('/api', async (req, res, next) => {
    // Skip health check - it handles its own connection check
    if (req.path === '/health') {
      return next();
    }
    
    // Only check connection once, then cache the result
    if (!dbConnectionChecked) {
      try {
        await sequelize.authenticate();
        dbConnectionStatus = true;
        console.log('✅ Database connection verified in serverless mode');
      } catch (error) {
        dbConnectionStatus = false;
        console.error('⚠️  Database connection failed in serverless mode:', error.message);
        // Don't block - let routes handle the error
        // This allows the app to start even if DB is temporarily unavailable
      }
      dbConnectionChecked = true;
    }
    
    // Continue to route - routes will handle database errors
    next();
  });
}

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
app.use('/api/super-admin', superAdminRoutes);
app.use('/api/saas-packages', saaSPackageRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/automation', automationRoutes);

// Health check route
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    const isConnected = await testConnection();
    if (isConnected) {
      res.json({ 
        status: 'OK', 
        message: 'Server is running',
        database: 'connected'
      });
    } else {
      res.status(503).json({ 
        status: 'ERROR', 
        message: 'Server is running but database connection failed',
        database: 'disconnected',
        error: process.env.VERCEL ? 'Check environment variables and database configuration' : undefined
      });
    }
  } catch (error) {
    const isDev = process.env.NODE_ENV === 'development' || process.env.VERCEL;
    res.status(503).json({ 
      status: 'ERROR', 
      message: 'Server is running but database connection failed',
      database: 'disconnected',
      error: isDev ? error.message : 'Database connection error',
      hint: 'Check environment variables: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Express error handler:', err);
  console.error('Error stack:', err.stack);
  console.error('Request details:', {
    method: req.method,
    url: req.url,
    path: req.path,
    body: req.body
  });
  
  const isDev = process.env.NODE_ENV === 'development' || 
                process.env.VERCEL_ENV === 'development' || 
                process.env.VERCEL_ENV === 'preview' ||
                process.env.VERCEL;
  
  const errorResponse = {
    message: err.message || 'Internal server error',
    error: isDev ? err.message : 'Internal server error',
    name: err.name || 'Error'
  };
  
  if (isDev) {
    errorResponse.stack = err.stack;
    errorResponse.code = err.code;
  }
  
  res.status(err.status || 500).json(errorResponse);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Export app for serverless functions (Vercel)
// Only start server if not in serverless mode
const isVercel = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

// Sync database and start server
const startServer = async () => {
  try {
    // Test database connection (skip in serverless mode during initialization)
    if (!isVercel) {
      await testConnection();
    } else {
      // In serverless mode, just try to authenticate without throwing
      try {
        await testConnection();
      } catch (dbError) {
        console.warn('⚠️  Database connection not ready during initialization (serverless mode)');
        console.warn('💡 Connection will be established on first request');
      }
    }

    // Sync database models (create tables if they don't exist)
    // In production, use migrations instead
    // Skip sync in Vercel serverless mode (tables should already exist)
    if (process.env.NODE_ENV !== 'production' && !isVercel) {
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
          // Sync RBAC tables
          await Permission.sync({ alter: true, force: false });
          await Role.sync({ alter: true, force: false });
          const RolePermission = require('./models/RolePermission');
          await RolePermission.sync({ alter: true, force: false });
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

    // Skip default data creation in serverless mode (tables should already exist)
    if (isVercel) {
      console.log('🚀 Running in serverless mode (Vercel) - skipping default data creation');
      return; // Exit early in serverless mode
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

    // Initialize RBAC roles and permissions
    console.log('🔐 Initializing RBAC system...');
    try {
      // Ensure Role and Permission tables exist
      await Role.sync({ alter: true, force: false });
      await Permission.sync({ alter: true, force: false });
      const RolePermission = require('./models/RolePermission');
      await RolePermission.sync({ alter: true, force: false });
      
      // Initialize default roles and permissions
      await initializeRBAC();
      console.log('✅ RBAC system initialized successfully');
    } catch (rbacError) {
      console.error('❌ Error initializing RBAC:', rbacError.message);
      
      // Check if it's the "Too many keys" error
      if (rbacError.message && rbacError.message.includes('Too many keys')) {
        console.error('\n🔧 Detected "Too many keys" error - this is a MySQL index limit issue.');
        console.error('💡 Solution: Run the following command to fix the role_permissions table:');
        console.error('   npm run fix:rbac');
        console.error('   OR: cd backend && node utils/fixRolePermissionsTable.js');
        console.error('\n⚠️  After running the fix, restart the server.');
      } else {
        console.error('❌ RBAC Error Stack:', rbacError.stack);
      }
      
      console.log('\n⚠️  Continuing without RBAC initialization...');
      console.log('💡 You can manually initialize by calling POST /api/roles/initialize');
    }

    // Initialize monthly scheduler (skip in serverless mode)
    if (!isVercel) {
      initializeScheduler();
    }

    // Start server only if not in serverless mode
    if (!isVercel) {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      });
    } else {
      console.log('🚀 Running in serverless mode (Vercel)');
    }
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    if (!isVercel) {
      process.exit(1);
    }
  }
};

// Only start server if not in serverless mode
if (!isVercel) {
  startServer().catch(err => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  });
} else {
  // In serverless mode, don't initialize anything synchronously
  // The app will be initialized on first request via api/index.js
  // Database connection will be established on first API request
  console.log('🚀 Serverless mode detected - app will initialize on first request');
}

// Graceful shutdown (only in traditional server mode)
if (!isVercel) {
  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    await sequelize.close();
    process.exit(0);
  });
}

// Export app for serverless functions
module.exports = app;

