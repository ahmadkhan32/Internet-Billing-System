// Comprehensive Database Connection Diagnostic Tool
// Run this to identify the exact issue with your database connection

const path = require('path');
const fs = require('fs');

// Find .env file - works from root or backend directory
let envPath = './backend/.env';
if (!fs.existsSync(envPath)) {
  // Try from backend directory
  envPath = './.env';
  if (!fs.existsSync(envPath)) {
    console.error('❌ Cannot find .env file!');
    console.error('💡 Make sure you run this from project root or backend directory');
    console.error('💡 Or create backend/.env file with database credentials');
    process.exit(1);
  }
}

require('dotenv').config({ path: envPath });
const { Sequelize } = require('sequelize');
const https = require('https');

console.log('🔍 Database Connection Diagnostic Tool');
console.log('=====================================\n');

// Step 1: Check Environment Variables
console.log('📋 Step 1: Checking Environment Variables...\n');

const requiredVars = {
  'DB_DIALECT': process.env.DB_DIALECT,
  'DB_HOST': process.env.DB_HOST,
  'DB_PORT': process.env.DB_PORT,
  'DB_USER': process.env.DB_USER,
  'DB_PASSWORD': process.env.DB_PASSWORD ? '***SET***' : 'NOT SET',
  'DB_NAME': process.env.DB_NAME,
  'DB_SSL': process.env.DB_SSL,
  'DB_SSL_REJECT_UNAUTHORIZED': process.env.DB_SSL_REJECT_UNAUTHORIZED
};

let missingVars = [];
let issues = [];

console.log('Environment Variables:');
Object.entries(requiredVars).forEach(([key, value]) => {
  if (!value || value === 'NOT SET') {
    console.log(`  ❌ ${key}: NOT SET`);
    missingVars.push(key);
    issues.push(`Missing: ${key}`);
  } else {
    console.log(`  ✅ ${key}: ${value}`);
  }
});

if (missingVars.length > 0) {
  console.log(`\n⚠️  Missing ${missingVars.length} environment variable(s)!`);
  console.log('💡 Fix: Set these in backend/.env file or Vercel environment variables\n');
} else {
  console.log('\n✅ All required environment variables are set!\n');
}

// Step 2: Check Supabase Project Status
console.log('📋 Step 2: Checking Supabase Project Status...\n');

const dbHost = process.env.DB_HOST;
if (dbHost && dbHost.includes('supabase.co')) {
  console.log(`Checking Supabase host: ${dbHost}`);
  
  // Try to resolve DNS
  const dns = require('dns');
  const hostname = dbHost.replace('db.', '').split('.')[0];
  
  dns.lookup(dbHost, (err, address) => {
    if (err) {
      console.log(`  ❌ DNS Lookup Failed: ${err.message}`);
      console.log(`  💡 This usually means:`);
      console.log(`     - Supabase project is PAUSED (most common)`);
      console.log(`     - Project was deleted`);
      console.log(`     - Hostname is incorrect`);
      console.log(`\n  🔧 Fix:`);
      console.log(`     1. Go to https://supabase.com/dashboard`);
      console.log(`     2. Click your project`);
      console.log(`     3. If paused → Click "Restore" or "Resume"`);
      console.log(`     4. Wait 1-2 minutes for database to start\n`);
      issues.push('Supabase project appears to be paused or DNS resolution failed');
    } else {
      console.log(`  ✅ DNS Resolved: ${address}`);
      console.log(`  ✅ Supabase project appears to be active\n`);
    }
    
    // Step 3: Test Database Connection
    testConnection();
  });
} else {
  console.log('⚠️  Not using Supabase (or DB_HOST not set)');
  console.log('   Skipping Supabase-specific checks\n');
  testConnection();
}

// Step 3: Test Database Connection
function testConnection() {
  console.log('📋 Step 3: Testing Database Connection...\n');
  
  if (missingVars.length > 0) {
    console.log('❌ Cannot test connection - missing environment variables');
    console.log('💡 Fix the missing variables first, then run this diagnostic again\n');
    printSummary();
    return;
  }
  
  const sequelize = new Sequelize(
    process.env.DB_NAME || 'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
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
      console.log('✅ Database connection successful!');
      console.log('   Your database is working correctly.\n');
      issues = issues.filter(i => !i.includes('connection'));
      printSummary();
    })
    .catch((error) => {
      console.log('❌ Database connection failed!');
      console.log(`   Error: ${error.message}\n`);
      
      // Analyze error
      if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
        console.log('🔍 Error Analysis: DNS Resolution Failed');
        console.log('   This means the database hostname cannot be resolved.\n');
        console.log('   💡 Most Common Causes:');
        console.log('      1. ❌ Supabase project is PAUSED (90% of cases)');
        console.log('      2. ❌ Wrong DB_HOST value');
        console.log('      3. ❌ Project was deleted\n');
        console.log('   🔧 Fix:');
        console.log('      1. Go to https://supabase.com/dashboard');
        console.log('      2. Click your project');
        console.log('      3. If you see "Paused" → Click "Restore"');
        console.log('      4. Wait 1-2 minutes');
        console.log('      5. Run this diagnostic again\n');
        issues.push('Supabase project is paused - RESTORE IT');
      } else if (error.message.includes('password') || error.message.includes('authentication')) {
        console.log('🔍 Error Analysis: Authentication Failed');
        console.log('   This means the username or password is incorrect.\n');
        console.log('   🔧 Fix:');
        console.log('      1. Go to Supabase Dashboard → Settings → Database');
        console.log('      2. Click "Reset database password" if needed');
        console.log('      3. Copy the password');
        console.log('      4. Update DB_PASSWORD in backend/.env');
        console.log('      5. Restart backend server\n');
        issues.push('Wrong database password - reset it in Supabase');
      } else if (error.message.includes('timeout') || error.message.includes('ECONNREFUSED')) {
        console.log('🔍 Error Analysis: Connection Timeout/Refused');
        console.log('   This means the database is not accessible.\n');
        console.log('   💡 Possible Causes:');
        console.log('      1. Supabase project is paused');
        console.log('      2. Firewall blocking connection');
        console.log('      3. Wrong port (try 6543 for connection pooling)\n');
        console.log('   🔧 Fix:');
        console.log('      1. Check Supabase project is active');
        console.log('      2. Try using port 6543 (connection pooling)');
        console.log('      3. Update DB_PORT=6543 in backend/.env\n');
        issues.push('Connection timeout - check Supabase status and port');
      } else if (error.message.includes('SSL')) {
        console.log('🔍 Error Analysis: SSL/TLS Error');
        console.log('   This means there\'s an SSL configuration issue.\n');
        console.log('   🔧 Fix:');
        console.log('      Ensure in backend/.env:');
        console.log('      DB_SSL=true');
        console.log('      DB_SSL_REJECT_UNAUTHORIZED=false\n');
        issues.push('SSL configuration issue');
      } else {
        console.log('🔍 Error Analysis: Unknown Error');
        console.log(`   Error details: ${error.message}\n`);
        issues.push(`Connection error: ${error.message}`);
      }
      
      printSummary();
    });
}

// Print Summary
function printSummary() {
  console.log('\n=====================================');
  console.log('📊 DIAGNOSTIC SUMMARY');
  console.log('=====================================\n');
  
  if (issues.length === 0) {
    console.log('✅ No issues found!');
    console.log('   Your database connection should work correctly.\n');
  } else {
    console.log(`❌ Found ${issues.length} issue(s):\n`);
    issues.forEach((issue, index) => {
      console.log(`   ${index + 1}. ${issue}`);
    });
    console.log('\n💡 Most Common Issue:');
    console.log('   Supabase projects on FREE tier auto-pause after inactivity.');
    console.log('   This is the #1 cause of database connection errors.\n');
    console.log('🔧 Quick Fix:');
    console.log('   1. Go to https://supabase.com/dashboard');
    console.log('   2. Click your project');
    console.log('   3. If paused → Click "Restore"');
    console.log('   4. Wait 1-2 minutes');
    console.log('   5. Restart your backend server\n');
  }
  
  console.log('📋 Next Steps:');
  console.log('   1. Fix the issues listed above');
  console.log('   2. Run this diagnostic again: node diagnose-database-connection.js');
  console.log('   3. If connection succeeds, start your backend server\n');
}

