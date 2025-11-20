const { Sequelize } = require('sequelize');
require('dotenv').config();

// This project uses ONLY Supabase (PostgreSQL)
// All MySQL code has been removed

console.log('🔍 Using Supabase (PostgreSQL) database only');

// Always use PostgreSQL config
try {
  module.exports = require('./db-postgres');
  return;
} catch (error) {
  console.error('❌ Error loading PostgreSQL config:', error.message);
  console.error('💡 Make sure pg and pg-hstore packages are installed: npm install pg pg-hstore');
  
  // Create a minimal fallback instance
  const { Sequelize } = require('sequelize');
  try {
    const dummySequelize = new Sequelize('postgres', 'postgres', '', {
      host: 'localhost',
      dialect: 'postgres',
      logging: false,
      retry: { max: 0 }
    });
    const testConnection = async () => {
      throw new Error('PostgreSQL config failed to load. Check environment variables and ensure pg package is installed.');
    };
    module.exports = { sequelize: dummySequelize, testConnection };
    return;
  } catch (dummyError) {
    console.error('❌ CRITICAL: Could not create Sequelize instance');
    throw new Error('PostgreSQL configuration failed. Please check your .env file and ensure DB_DIALECT=postgres is set.');
  }
}
