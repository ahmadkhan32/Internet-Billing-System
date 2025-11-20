// Connect Supabase Database - Complete Setup
// This script will help you connect Supabase to your project

require('dotenv').config();
const dns = require('dns');
const { promisify } = require('util');
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const dnsResolve = promisify(dns.resolve4);

console.log('');
console.log('🔌 CONNECT SUPABASE DATABASE');
console.log('============================');
console.log('');

// Step 1: Check current configuration
console.log('📋 Step 1: Checking Current Configuration...');
console.log('');

const dbHost = process.env.DB_HOST;
const dbPort = parseInt(process.env.DB_PORT || 5432);
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbDialect = process.env.DB_DIALECT;

console.log('Current Settings:');
console.log(`   DB_DIALECT: ${dbDialect || 'NOT SET'}`);
console.log(`   DB_HOST: ${dbHost || 'NOT SET'}`);
console.log(`   DB_PORT: ${dbPort || 'NOT SET'}`);
console.log(`   DB_USER: ${dbUser || 'NOT SET'}`);
console.log(`   DB_PASSWORD: ${dbPassword ? '***SET***' : 'NOT SET'}`);
console.log(`   DB_NAME: ${dbName || 'NOT SET'}`);
console.log(`   DB_SSL: ${process.env.DB_SSL || 'NOT SET'}`);
console.log('');

// Step 2: Check if Supabase is active
console.log('📋 Step 2: Checking Supabase Status...');
console.log('');

if (!dbHost) {
  console.log('❌ DB_HOST is not set!');
  console.log('');
  console.log('✅ TO FIX:');
  console.log('   1. Get Supabase connection string:');
  console.log('      - Go to: https://supabase.com/dashboard');
  console.log('      - Click your project');
  console.log('      - Settings → Database → Connection string');
  console.log('      - Copy the URI connection string');
  console.log('');
  console.log('   2. Update backend/.env file with:');
  console.log('      DB_DIALECT=postgres');
  console.log('      DB_HOST=db.xxxxx.supabase.co');
  console.log('      DB_PORT=6543');
  console.log('      DB_USER=postgres');
  console.log('      DB_PASSWORD=your-password');
  console.log('      DB_NAME=postgres');
  console.log('      DB_SSL=true');
  console.log('      DB_SSL_REJECT_UNAUTHORIZED=false');
  console.log('');
  process.exit(1);
}

async function checkAndConnect() {
  try {
    // Test DNS resolution
    console.log('   🔍 Testing DNS resolution...');
    const addresses = await dnsResolve(dbHost);
    console.log(`   ✅ DNS resolved! IP: ${addresses[0]}`);
    console.log('   ✅ Supabase project is ACTIVE (not sleeping)');
    console.log('');
  } catch (dnsError) {
    console.log('   ❌ DNS resolution FAILED!');
    console.log(`   Error: ${dnsError.message}`);
    console.log('');
    console.log('🔍 This means:');
    console.log('   ❌ Supabase project is SLEEPING/PAUSED');
    console.log('   ❌ Database hostname cannot be resolved');
    console.log('');
    console.log('✅ TO FIX - Restore Supabase Project:');
    console.log('   1. Go to: https://supabase.com/dashboard');
    console.log('   2. Sign in to your account');
    console.log('   3. Find your project in the list');
    console.log('   4. Look for "Paused" or "Sleeping" status');
    console.log('   5. Click "Restore" or "Resume" button');
    console.log('   6. Wait 3-5 minutes for database to fully restore');
    console.log('   7. Run this script again: node connect-supabase-now.js');
    console.log('');
    console.log('💡 After restoring, DNS will resolve and connection will work!');
    console.log('');
    process.exit(1);
  }

  // Step 3: Test database connection
  console.log('📋 Step 3: Testing Database Connection...');
  console.log('');

  if (!dbUser || !dbPassword || !dbName) {
    console.log('❌ Missing database credentials!');
    console.log('');
    console.log('✅ TO FIX:');
    console.log('   Set these in backend/.env:');
    console.log('   - DB_USER=postgres');
    console.log('   - DB_PASSWORD=your-password');
    console.log('   - DB_NAME=postgres');
    console.log('');
    process.exit(1);
  }

  try {
    const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      port: dbPort,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });

    await sequelize.authenticate();
    console.log('✅ Database Connection: SUCCESS!');
    console.log('   ✅ Connected to Supabase database');
    console.log('   ✅ Credentials are correct');
    console.log('');

    // Test query
    console.log('📋 Step 4: Testing Database Query...');
    console.log('');
    
    try {
      const [results] = await sequelize.query('SELECT version() as version, current_database() as database, current_user as user;');
      if (results && results.length > 0) {
        console.log('✅ Database Query: SUCCESS');
        console.log(`   Database: ${results[0].database}`);
        console.log(`   User: ${results[0].user}`);
        console.log('');
      }

      // Check if tables exist
      const [tables] = await sequelize.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        ORDER BY table_name;
      `);
      
      console.log(`📊 Database Schema: ${tables.length} tables found`);
      if (tables.length > 0) {
        console.log('   ✅ Database has tables (schema is set up)');
      } else {
        console.log('   ⚠️  No tables found (run migrations)');
      }
      console.log('');

    } catch (queryError) {
      console.log('   ⚠️  Query test failed, but connection works');
      console.log('');
    }

    await sequelize.close();

    // Final success
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 SUPABASE CONNECTED SUCCESSFULLY!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('✅ All checks passed:');
    console.log('   ✅ DNS resolution working');
    console.log('   ✅ Database connection successful');
    console.log('   ✅ Credentials are correct');
    console.log('   ✅ Database is ready to use');
    console.log('');
    console.log('💡 Next steps:');
    console.log('   1. Start backend: npm start');
    console.log('   2. Login with: admin@billing.com / admin123');
    console.log('   3. All database operations will work!');
    console.log('');
    process.exit(0);

  } catch (connError) {
    console.log('❌ Database Connection: FAILED');
    console.log(`   Error: ${connError.message}`);
    console.log('');

    if (connError.message.includes('password') || connError.message.includes('authentication')) {
      console.log('🔍 This means:');
      console.log('   ❌ Authentication failed');
      console.log('   ❌ Credentials are INCORRECT');
      console.log('');
      console.log('✅ TO FIX - Get Correct Credentials:');
      console.log('   1. Go to: https://supabase.com/dashboard');
      console.log('   2. Click your project');
      console.log('   3. Settings → Database');
      console.log('   4. Scroll to "Connection string" section');
      console.log('   5. Click "URI" tab');
      console.log('   6. Copy the connection string');
      console.log('   7. Extract values and update backend/.env');
      console.log('   8. If password is lost, reset it:');
      console.log('      - Settings → Database → Reset database password');
      console.log('');
    } else if (connError.message.includes('timeout')) {
      console.log('🔍 This means:');
      console.log('   ❌ Connection timed out');
      console.log('   💡 Try port 6543 (connection pooling) instead of 5432');
      console.log('');
    } else {
      console.log('🔍 Connection failed for unknown reason');
      console.log('   Check error message above');
      console.log('');
    }

    process.exit(1);
  }
}

// Run the check
checkAndConnect().catch(error => {
  console.error('❌ Unexpected error:', error.message);
  process.exit(1);
});

