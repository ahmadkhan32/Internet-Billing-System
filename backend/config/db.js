const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check if MySQL is running');
    console.error('   2. Verify .env file has correct DB credentials');
    console.error('   3. Ensure database exists (run: npm run init-db)');
    console.error('   4. Check MySQL user permissions\n');
    throw error; // Re-throw to prevent server from starting with bad connection
  }
};

module.exports = { sequelize, testConnection };

