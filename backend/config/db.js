const { Sequelize } = require('sequelize');
require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0 && process.env.VERCEL) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  console.error('💡 Please set these in your Vercel project settings');
}

const sequelize = new Sequelize(
  process.env.DB_NAME || 'billing_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
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
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    console.error('\n💡 Troubleshooting:');
    if (process.env.VERCEL) {
      console.error('   Vercel Deployment:');
      console.error('   1. Check environment variables in Vercel project settings');
      console.error('   2. Verify database allows connections from Vercel IPs');
      console.error('   3. Check database credentials are correct');
      console.error('   4. Ensure database is accessible from the internet\n');
    } else {
      console.error('   1. Check if MySQL is running');
      console.error('   2. Verify .env file has correct DB credentials');
      console.error('   3. Ensure database exists (run: npm run init-db)');
      console.error('   4. Check MySQL user permissions\n');
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

