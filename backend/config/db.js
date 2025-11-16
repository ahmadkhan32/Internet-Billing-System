const { Sequelize } = require('sequelize');
require('dotenv').config();

// Check if mysql2 is installed
try {
  require('mysql2');
} catch (mysql2Error) {
  console.error('❌ mysql2 package is not installed!');
  console.error('💡 Run: cd backend && npm install mysql2');
  if (process.env.VERCEL) {
    console.error('💡 Vercel: Check that backend dependencies are installed in build command');
    throw new Error('Please install mysql2 package manually. Check Vercel build logs and ensure backend/node_modules exists.');
  } else {
    throw mysql2Error;
  }
}

// Validate required environment variables
// Only require variables that are actually used in the configuration
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  if (process.env.VERCEL) {
    console.error('💡 Please set these in your Vercel project settings');
    console.error('💡 Go to: Vercel Dashboard → Settings → Environment Variables');
  } else {
    console.error('💡 Please set these in your .env file');
  }
  // Don't exit in serverless mode - let it fail gracefully on first request
  if (!process.env.VERCEL) {
    console.error('⚠️  Server will continue but database operations will fail');
  }
}

// In Vercel/production, don't use localhost defaults - require explicit values
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

// In Vercel, fail fast if variables are missing (don't try localhost)
if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
  if (!dbHost || !dbUser || !dbPassword || !dbName) {
    const missing = [];
    if (!dbHost) missing.push('DB_HOST');
    if (!dbUser) missing.push('DB_USER');
    if (!dbPassword) missing.push('DB_PASSWORD');
    if (!dbName) missing.push('DB_NAME');
    
    const errorMsg = `Missing required environment variables: ${missing.join(', ')}. Please set these in Vercel project settings.`;
    console.error('❌', errorMsg);
    console.error('💡 Go to: Vercel Dashboard → Settings → Environment Variables');
    console.error('💡 See SET_ENV_VARIABLES_URGENT.md for step-by-step instructions');
    console.error('💡 After adding variables, you MUST redeploy for them to take effect!');
    
    // Don't throw in serverless - let the request handler show the error
    // This allows the app to start and show helpful error messages
    if (!process.env.VERCEL) {
      throw new Error(errorMsg);
    }
    // In Vercel, we'll handle this in the request handler
  }
}

const sequelize = new Sequelize(
  dbName || 'billing_db',
  dbUser || 'root',
  dbPassword || '',
  {
    host: dbHost || 'localhost',
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: process.env.VERCEL ? 2 : 5, // Lower pool size for serverless
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // Add connection retry for serverless
    retry: {
      max: 3,
      match: [
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /ESOCKETTIMEDOUT/,
        /EHOSTUNREACH/,
        /EPIPE/,
        /EAI_AGAIN/,
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/
      ]
    }
  }
);

// Test connection
const testConnection = async () => {
  try {
    // Check environment variables first
    // In local development, DB_PASSWORD can be empty (no password)
    // In Vercel/production, all variables must be explicitly set
    const requiredVars = ['DB_HOST', 'DB_USER', 'DB_NAME'];
    const missingVars = requiredVars.filter(v => !process.env[v] || process.env[v].trim() === '');
    
    // For Vercel/production, also require DB_PASSWORD to be explicitly set (even if empty string)
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      if (process.env.DB_PASSWORD === undefined) {
        missingVars.push('DB_PASSWORD');
      }
    }
    // For local development, DB_PASSWORD can be empty string (means no password)
    // Empty string is valid for local MySQL with no password
    
    if (missingVars.length > 0) {
      const errorMsg = `Missing environment variables: ${missingVars.join(', ')}`;
      console.error('❌', errorMsg);
      if (process.env.VERCEL) {
        console.error('💡 Go to: Vercel Dashboard → Settings → Environment Variables');
        console.error('💡 Add these variables and redeploy');
      } else {
        console.error('💡 Please set these in your .env file');
        console.error('💡 Note: DB_PASSWORD can be empty (DB_PASSWORD=) if MySQL has no password');
      }
      throw new Error(errorMsg);
    }
    
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    console.error('📋 Connection Details:');
    console.error('   Host:', process.env.DB_HOST || 'NOT SET');
    console.error('   User:', process.env.DB_USER || 'NOT SET');
    console.error('   Database:', process.env.DB_NAME || 'NOT SET');
    console.error('   Password:', process.env.DB_PASSWORD ? '***SET***' : 'NOT SET');
    
    console.error('\n💡 Troubleshooting:');
    if (process.env.VERCEL) {
      console.error('   Vercel Deployment:');
      console.error('   1. ✅ Check environment variables in Vercel project settings');
      console.error('   2. ✅ Verify database allows connections from Vercel IPs');
      console.error('   3. ✅ Check database credentials are correct');
      console.error('   4. ✅ Ensure database is accessible from the internet');
      console.error('   5. ✅ Check database firewall/security groups allow external connections');
    } else {
      console.error('   1. Check if MySQL is running');
      console.error('   2. Verify .env file has correct DB credentials');
      console.error('   3. Ensure database exists (run: npm run init-db)');
      console.error('   4. Check MySQL user permissions');
    }
    
    // In serverless mode, don't throw - let the request handler deal with it
    if (process.env.VERCEL) {
      console.warn('⚠️  Continuing without database connection (serverless mode)');
      return false;
    }
    throw error; // Re-throw in traditional server mode
  }
};

module.exports = { sequelize, testConnection };

