// Fix ENOTFOUND Error - Comprehensive Diagnostic and Fix
const path = require('path');
const fs = require('fs');

// Find .env file
let envPath = './backend/.env';
if (!fs.existsSync(envPath)) {
  envPath = './.env';
  if (!fs.existsSync(envPath)) {
    console.error('❌ Cannot find .env file!');
    console.error('💡 Make sure backend/.env file exists\n');
    process.exit(1);
  }
}

require('dotenv').config({ path: envPath });

// Try to load sequelize from backend/node_modules
let Sequelize;
try {
  Sequelize = require(path.join(__dirname, 'backend/node_modules/sequelize')).Sequelize;
} catch (e) {
  try {
    Sequelize = require('sequelize').Sequelize;
  } catch (e2) {
    console.error('❌ Sequelize not found!');
    console.error('💡 Run: cd backend && npm install\n');
    process.exit(1);
  }
}

const dns = require('dns');

console.log('🔍 Fixing ENOTFOUND Error');
console.log('=====================================\n');

const dbHost = process.env.DB_HOST;

if (!dbHost) {
  console.error('❌ DB_HOST is not set in .env file!');
  console.error('💡 Run: .\\backend\\get-supabase-credentials.ps1 to set up credentials\n');
  process.exit(1);
}

console.log(`📋 Current Configuration:`);
console.log(`   DB_HOST: ${dbHost}`);
console.log(`   DB_PORT: ${process.env.DB_PORT || '5432'}`);
console.log(`   DB_USER: ${process.env.DB_USER || 'NOT SET'}`);
console.log(`   DB_NAME: ${process.env.DB_NAME || 'NOT SET'}\n`);

// Step 1: Test DNS Resolution
console.log('🔍 Step 1: Testing DNS Resolution...\n');

dns.lookup(dbHost, (err, address) => {
  if (err) {
    console.log('❌ DNS Resolution FAILED!\n');
    console.log(`Error: ${err.message}\n`);
    console.log('🔍 This means the hostname cannot be resolved.\n');
    console.log('💡 Most Common Causes:');
    console.log('   1. ❌ Supabase project is PAUSED (even if dashboard says active)');
    console.log('   2. ❌ Wrong hostname in DB_HOST');
    console.log('   3. ❌ Supabase project was deleted');
    console.log('   4. ❌ Network connectivity issue\n');
    
    console.log('🔧 FIX STEPS:\n');
    console.log('   1. Go to: https://supabase.com/dashboard');
    console.log('   2. Click your project');
    console.log('   3. Check project status:');
    console.log('      - If you see "Paused" → Click "Restore" or "Resume"');
    console.log('      - If you see "Inactive" → Click "Restore Project"');
    console.log('      - Wait 2-3 minutes for database to start\n');
    console.log('   4. Get FRESH connection string:');
    console.log('      - Go to Settings → Database');
    console.log('      - Copy connection string (URI tab)');
    console.log('      - Run: .\\backend\\get-supabase-credentials.ps1');
    console.log('      - Paste connection string\n');
    console.log('   5. Try connection pooling port 6543:');
    console.log('      - Update DB_PORT=6543 in backend/.env');
    console.log('      - Connection pooling is more reliable\n');
    
    console.log('⚠️  IMPORTANT:');
    console.log('   Even if dashboard shows "Active", the project might be paused.');
    console.log('   Try pausing and restoring it to refresh the connection.\n');
    
    process.exit(1);
  } else {
    console.log(`✅ DNS Resolution SUCCESS!`);
    console.log(`   Hostname: ${dbHost}`);
    console.log(`   Resolved to: ${address}\n`);
    
    // Step 2: Test Database Connection
    console.log('🔍 Step 2: Testing Database Connection...\n');
    
    // Try with current port first
    testConnection(process.env.DB_PORT || '5432', 'Direct Connection');
    
    // Also try connection pooling port
    if (process.env.DB_PORT !== '6543') {
      console.log('\n💡 TIP: Trying connection pooling port 6543 (more reliable)...\n');
      setTimeout(() => {
        testConnection('6543', 'Connection Pooling');
      }, 2000);
    }
  }
});

function testConnection(port, connectionType) {
  const sequelize = new Sequelize(
    process.env.DB_NAME || 'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '',
    {
      host: dbHost,
      port: parseInt(port),
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: process.env.DB_SSL !== 'false' ? {
          require: true,
          rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
        } : false
      },
      pool: {
        max: 1,
        min: 0,
        acquire: 10000,
        idle: 5000
      }
    }
  );
  
  sequelize.authenticate()
    .then(() => {
      console.log(`✅ ${connectionType} SUCCESS!`);
      console.log(`   Port: ${port}`);
      console.log(`   Host: ${dbHost}\n`);
      console.log('✅ Database connection is working!\n');
      console.log('💡 Recommendation:');
      if (port === '6543') {
        console.log('   Use port 6543 (connection pooling) for better performance');
        console.log('   Update DB_PORT=6543 in backend/.env\n');
      }
      process.exit(0);
    })
    .catch((error) => {
      console.log(`❌ ${connectionType} FAILED (Port ${port})`);
      console.log(`   Error: ${error.message}\n`);
      
      if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
        console.log('🔍 Issue: DNS Resolution Failed');
        console.log('💡 This usually means Supabase project is paused\n');
        console.log('🔧 Fix:');
        console.log('   1. Go to Supabase Dashboard');
        console.log('   2. Click your project');
        console.log('   3. If paused → Click "Restore"');
        console.log('   4. Wait 2-3 minutes');
        console.log('   5. Run this script again\n');
      } else if (error.message.includes('password') || error.message.includes('authentication')) {
        console.log('🔍 Issue: Authentication Failed');
        console.log('💡 Wrong password\n');
        console.log('🔧 Fix:');
        console.log('   1. Go to Supabase Dashboard → Settings → Database');
        console.log('   2. Click "Reset database password"');
        console.log('   3. Copy new password');
        console.log('   4. Run: .\\backend\\get-supabase-credentials.ps1\n');
      } else if (error.message.includes('timeout') || error.message.includes('ECONNREFUSED')) {
        console.log('🔍 Issue: Connection Timeout');
        console.log('💡 Database not accessible on this port\n');
        console.log('🔧 Try:');
        console.log('   - Use port 6543 (connection pooling)');
        console.log('   - Update DB_PORT=6543 in backend/.env\n');
      }
    });
}

