const { Sequelize } = require('sequelize');
require('dotenv').config();

// Check if pg (PostgreSQL) is installed
let pgAvailable = false;
try {
  require('pg');
  pgAvailable = true;
} catch (pgError) {
  console.error('❌ pg package is not installed!');
  console.error('💡 Run: cd backend && npm install pg pg-hstore');
  pgAvailable = false;
}

// Support both DATABASE_URL (connection string) and individual variables
let dbName, dbUser, dbPassword, dbHost, dbPort;

if (process.env.DATABASE_URL) {
  // Parse DATABASE_URL if provided
  // Format: postgresql://user:password@host:port/database
  try {
    const url = new URL(process.env.DATABASE_URL);
    dbUser = url.username || 'postgres';
    dbPassword = url.password || '';
    dbHost = url.hostname;
    dbPort = parseInt(url.port) || 5432;
    dbName = url.pathname.slice(1) || 'postgres'; // Remove leading /
    
    console.log('✅ Using DATABASE_URL connection string');
    console.log(`   Host: ${dbHost}`);
    console.log(`   Port: ${dbPort}`);
    console.log(`   Database: ${dbName}`);
    console.log(`   User: ${dbUser}`);
  } catch (urlError) {
    console.error('❌ Invalid DATABASE_URL format!');
    console.error('   Expected: postgresql://user:password@host:port/database');
    console.error('   Falling back to individual environment variables...');
    // Fall through to individual variables
  }
}

// Fall back to individual environment variables if DATABASE_URL not set or invalid
if (!dbHost) {
  dbName = process.env.DB_NAME;
  dbUser = process.env.DB_USER;
  dbPassword = process.env.DB_PASSWORD || '';
  dbHost = process.env.DB_HOST;
  dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
  
  console.log('✅ Using individual environment variables');
  console.log(`   Host: ${dbHost || 'NOT SET'}`);
  console.log(`   Port: ${dbPort}`);
  console.log(`   Database: ${dbName || 'NOT SET'}`);
  console.log(`   User: ${dbUser || 'NOT SET'}`);
}

// Validate required variables
const requiredVars = ['DB_NAME', 'DB_USER', 'DB_HOST'];
if (!process.env.DATABASE_URL) {
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars.join(', '));
    console.error('💡 Please set these in your .env file or use DATABASE_URL');
  }
}

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

// Create Sequelize instance
let sequelize;
try {
  const sequelizeConfig = {
    database: dbName || 'postgres',
    username: dbUser || 'postgres',
    password: dbPassword || '',
    host: dbHost || 'localhost',
    port: dbPort,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      ...sslConfig,
    },
    pool: {
      max: process.env.VERCEL ? 1 : 5,
      min: 0,
      acquire: process.env.VERCEL ? 10000 : 30000,
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
  };

  if (pgAvailable) {
    sequelizeConfig.dialectModule = require('pg');
  }

  sequelize = new Sequelize(
    sequelizeConfig.database,
    sequelizeConfig.username,
    sequelizeConfig.password,
    sequelizeConfig
  );
} catch (seqError) {
  console.error('❌ Error creating Sequelize instance:', seqError.message);
  sequelize = new Sequelize({
    dialect: 'postgres',
    logging: false
  });
}

// Test connection
const testConnection = async (retries = 2) => {
  try {
    // Check if we have required connection info
    if (!dbHost || !dbUser || !dbName) {
      const missing = [];
      if (!dbHost) missing.push('DB_HOST or DATABASE_URL');
      if (!dbUser) missing.push('DB_USER or DATABASE_URL');
      if (!dbName) missing.push('DB_NAME or DATABASE_URL');
      
      const errorMsg = `Missing required connection info: ${missing.join(', ')}`;
      console.error('❌', errorMsg);
      console.error('💡 Set DATABASE_URL or individual DB_* variables in .env file');
      throw new Error(errorMsg);
    }
    
    // Attempt connection
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL connection established successfully.');
        return true;
      } catch (connError) {
        lastError = connError;
        if (attempt < retries) {
          const delay = Math.pow(2, attempt) * 1000;
          console.warn(`⚠️  Connection attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  } catch (error) {
    console.error('❌ Unable to connect to PostgreSQL database:', error.message);
    console.error('📋 Connection Details:');
    console.error('   Host:', dbHost || 'NOT SET');
    console.error('   Port:', dbPort || 'NOT SET');
    console.error('   User:', dbUser || 'NOT SET');
    console.error('   Database:', dbName || 'NOT SET');
    console.error('   Password:', dbPassword ? '***SET***' : 'NOT SET');
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('\n🔍 Issue: Cannot resolve database hostname (ENOTFOUND)');
      console.error('💡 This usually means:');
      console.error('   1. ❌ Supabase project is PAUSED (most common)');
      console.error('   2. ❌ Database hostname is incorrect');
      console.error('   3. ❌ Supabase project was deleted');
      console.error('\n✅ Solutions:');
      console.error('   1. Go to: https://supabase.com/dashboard');
      console.error('   2. Click your project');
      console.error('   3. Click "Restore" (even if it shows "Active")');
      console.error('   4. Wait 3-5 minutes');
      console.error('   5. Restart server: npm start');
    }
    
    if (process.env.NODE_ENV !== 'production') {
      console.warn('⚠️  Continuing without database connection (local development)');
      return false;
    }
    throw error;
  }
};

// Ensure sequelize is always defined
if (!sequelize) {
  sequelize = new Sequelize({
    dialect: 'postgres',
    logging: false
  });
}

module.exports = { sequelize, testConnection };

