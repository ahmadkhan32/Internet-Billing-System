const { Sequelize } = require('sequelize');
require('dotenv').config();

// Check if pg (PostgreSQL) is installed
try {
  require('pg');
} catch (pgError) {
  console.error('❌ pg package is not installed!');
  console.error('💡 Run: cd backend && npm install pg pg-hstore');
  throw new Error('Please install pg and pg-hstore packages for PostgreSQL support.');
}

// Get database dialect from environment (default to mysql for backward compatibility)
const dbDialect = process.env.DB_DIALECT || 'mysql';

// Only use this config if DB_DIALECT is postgres
if (dbDialect !== 'postgres') {
  // Fall back to regular db.js
  module.exports = require('./db');
  return;
}

// Validate required environment variables
const checkEnvVar = (varName) => {
  return process.env[varName] !== undefined;
};

const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_HOST'];
const missingVars = requiredEnvVars.filter(varName => !checkEnvVar(varName));

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  console.error('💡 Please set these in your .env file');
}

// Database configuration
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432; // Default PostgreSQL port

// Configure SSL for Supabase (required)
const sslConfig = {};
const useSSL = process.env.DB_SSL !== 'false'; // Default to true for Supabase

if (useSSL) {
  sslConfig.ssl = {
    require: true,
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
  };
  console.log('🔒 SSL enabled for PostgreSQL connection (Supabase)');
}

const sequelize = new Sequelize(
  dbName || 'postgres',
  dbUser || 'postgres',
  dbPassword,
  {
    host: dbHost || 'localhost',
    port: dbPort,
    dialect: 'postgres',
    dialectModule: require('pg'),
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      ...sslConfig,
      // PostgreSQL specific options
    },
    pool: {
      max: process.env.VERCEL ? 1 : 5,
      min: 0,
      acquire: process.env.VERCEL ? 15000 : 30000,
      idle: process.env.VERCEL ? 5000 : 10000
    },
    retry: {
      max: 3,
      match: [
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /ESOCKETTIMEDOUT/,
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

// Test connection with retry logic
const testConnection = async (retries = 2) => {
  try {
    const requiredVars = ['DB_HOST', 'DB_USER', 'DB_NAME'];
    const missingVars = requiredVars.filter(v => !process.env[v] || process.env[v].trim() === '');
    
    if (process.env.DB_PASSWORD === undefined || process.env.DB_PASSWORD.trim() === '') {
      missingVars.push('DB_PASSWORD');
    }
    
    if (missingVars.length > 0) {
      const errorMsg = `Missing environment variables: ${missingVars.join(', ')}`;
      console.error('❌', errorMsg);
      console.error('💡 Please set these in your .env file');
      const err = new Error(errorMsg);
      err.code = 'MISSING_ENV_VARS';
      err.missingVars = missingVars;
      throw err;
    }
    
    // Attempt connection with retry logic
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL connection established successfully.');
        return true;
      } catch (connError) {
        lastError = connError;
        if (attempt < retries) {
          const delay = Math.pow(2, attempt) * 1000; // Exponential backoff: 1s, 2s, 4s
          console.warn(`⚠️  Connection attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  } catch (error) {
    if (!error.code) {
      error.code = error.original?.code || error.parent?.code || 'UNKNOWN';
    }
    
    console.error('❌ Unable to connect to PostgreSQL database:', error.message);
    console.error('📋 Connection Details:');
    console.error('   Host:', process.env.DB_HOST || 'NOT SET');
    console.error('   User:', process.env.DB_USER || 'NOT SET');
    console.error('   Database:', process.env.DB_NAME || 'NOT SET');
    console.error('   Password:', process.env.DB_PASSWORD ? '***SET***' : 'NOT SET');
    console.error('   Error Code:', error.code);
    
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check Supabase project settings');
    console.error('   2. Verify database credentials');
    console.error('   3. Ensure SSL is enabled (required for Supabase)');
    console.error('   4. Check database firewall settings');
    console.error('   5. Verify connection string format');
    
    if (process.env.NODE_ENV !== 'production') {
      console.warn('⚠️  Continuing without database connection (local development)');
      return false;
    }
    throw error;
  }
};

module.exports = { sequelize, testConnection };

