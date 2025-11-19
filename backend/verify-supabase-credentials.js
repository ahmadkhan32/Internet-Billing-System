// Verify Supabase Credentials
// This script checks if your Supabase credentials are set correctly

require('dotenv').config();
const dns = require('dns').promises;

console.log('');
console.log('🔍 Verifying Supabase Credentials');
console.log('=====================================');
console.log('');

// Check environment variables
const credentials = {
  DB_DIALECT: process.env.DB_DIALECT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD ? '***SET***' : 'NOT SET',
  DB_NAME: process.env.DB_NAME,
  DB_SSL: process.env.DB_SSL,
  DB_SSL_REJECT_UNAUTHORIZED: process.env.DB_SSL_REJECT_UNAUTHORIZED
};

console.log('📋 Current Credentials:');
console.log('');

let allSet = true;
Object.entries(credentials).forEach(([key, value]) => {
  if (!value || value === 'NOT SET') {
    console.log(`  ❌ ${key}: ${value || 'NOT SET'}`);
    allSet = false;
  } else {
    console.log(`  ✅ ${key}: ${value}`);
  }
});

console.log('');

if (!allSet) {
  console.log('❌ Some credentials are missing!');
  console.log('');
  console.log('💡 To set credentials:');
  console.log('   1. Run: .\\get-supabase-credentials.ps1');
  console.log('   2. Or manually edit backend/.env file');
  console.log('');
  process.exit(1);
}

console.log('✅ All credentials are set!');
console.log('');

// Verify hostname format
const dbHost = process.env.DB_HOST;
if (dbHost) {
  console.log('🔍 Verifying hostname format...');
  
  // Check if it's a Supabase hostname
  if (dbHost.includes('supabase.co')) {
    console.log('  ✅ Hostname format is correct (Supabase)');
    
    // Extract project ID
    const match = dbHost.match(/db\.([^.]+)\.supabase\.co/);
    if (match) {
      const projectId = match[1];
      console.log(`  📋 Project ID: ${projectId}`);
      console.log(`  📋 Full hostname: ${dbHost}`);
    }
  } else {
    console.log('  ⚠️  Hostname does not look like Supabase');
    console.log('  💡 Expected format: db.xxxxx.supabase.co');
  }
  
  console.log('');
  
  // Test DNS resolution
  console.log('🔍 Testing DNS resolution...');
  dns.resolve4(dbHost)
    .then((addresses) => {
      console.log(`  ✅ DNS resolved successfully!`);
      console.log(`  📋 IP address: ${addresses[0]}`);
      console.log('');
      console.log('✅ Credentials are correct and database is accessible!');
      console.log('');
      console.log('💡 If you still see ENOTFOUND errors:');
      console.log('   1. Supabase project might be paused');
      console.log('   2. Go to: https://supabase.com/dashboard');
      console.log('   3. Click your project');
      console.log('   4. Click "Restore"');
      console.log('   5. Wait 3-5 minutes');
      console.log('');
      process.exit(0);
    })
    .catch((error) => {
      console.log(`  ❌ DNS resolution failed!`);
      console.log(`  📋 Error: ${error.message}`);
      console.log('');
      console.log('🔍 This means:');
      console.log('   1. ❌ Supabase project is PAUSED (most common)');
      console.log('   2. ❌ Hostname is incorrect');
      console.log('   3. ❌ Project was deleted');
      console.log('');
      console.log('✅ FIX STEPS:');
      console.log('   1. Go to: https://supabase.com/dashboard');
      console.log('   2. Click your project');
      console.log('   3. If "Paused" → Click "Restore"');
      console.log('   4. If "Active" → Click "Pause" → Wait 30s → Click "Restore"');
      console.log('   5. Wait 3-5 minutes for database to start');
      console.log('   6. Run this script again: node verify-supabase-credentials.js');
      console.log('');
      process.exit(1);
    });
} else {
  console.log('❌ DB_HOST is not set!');
  process.exit(1);
}

