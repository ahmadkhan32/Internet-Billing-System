// Auto-check Supabase status and notify when ready
// Run this script and it will keep checking until Supabase is restored

require('dotenv').config();
const dns = require('dns').promises;
const { testConnection } = require('./config/db');

const dbHost = process.env.DB_HOST;
const CHECK_INTERVAL = 30000; // Check every 30 seconds
const MAX_CHECKS = 20; // Stop after 20 checks (10 minutes)

let checkCount = 0;

console.log('');
console.log('🔍 Auto-Checking Supabase Status');
console.log('==================================');
console.log('');
console.log('📋 Configuration:');
console.log(`   Hostname: ${dbHost}`);
console.log(`   Check interval: ${CHECK_INTERVAL / 1000} seconds`);
console.log(`   Max checks: ${MAX_CHECKS} (${(MAX_CHECKS * CHECK_INTERVAL) / 60000} minutes)`);
console.log('');
console.log('💡 This script will keep checking until Supabase is restored...');
console.log('💡 Press Ctrl+C to stop');
console.log('');

async function checkSupabase() {
  checkCount++;
  
  console.log(`[${new Date().toLocaleTimeString()}] Check #${checkCount}/${MAX_CHECKS}`);
  
  try {
    // Step 1: Check DNS resolution
    console.log('   🔍 Checking DNS resolution...');
    const addresses = await dns.resolve4(dbHost);
    console.log(`   ✅ DNS resolved! IP: ${addresses[0]}`);
    
    // Step 2: Check database connection
    console.log('   🔍 Testing database connection...');
    const connected = await testConnection();
    
    if (connected) {
      console.log('');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🎉 SUCCESS! Supabase is RESTORED and READY!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('');
      console.log('✅ Next steps:');
      console.log('   1. Restart backend: npm start');
      console.log('   2. Test login: npm run test-login');
      console.log('   3. Access frontend: http://localhost:3002');
      console.log('');
      process.exit(0);
    } else {
      console.log('   ⚠️  DNS resolved but database connection failed');
      console.log('   💡 Database might still be starting...');
    }
  } catch (error) {
    if (error.code === 'ENODATA' || error.code === 'ENOTFOUND') {
      console.log('   ❌ DNS resolution failed (project is paused)');
      console.log('   💡 Restore Supabase project: https://supabase.com/dashboard');
    } else {
      console.log(`   ⚠️  Error: ${error.message}`);
    }
  }
  
  console.log('');
  
  if (checkCount >= MAX_CHECKS) {
    console.log('⚠️  Maximum checks reached. Stopping...');
    console.log('');
    console.log('💡 Supabase might still be starting. Try:');
    console.log('   1. Check Supabase dashboard: https://supabase.com/dashboard');
    console.log('   2. Wait a few more minutes');
    console.log('   3. Run this script again: node auto-check-supabase.js');
    console.log('');
    process.exit(1);
  }
  
  // Wait before next check
  console.log(`   ⏳ Waiting ${CHECK_INTERVAL / 1000} seconds before next check...`);
  console.log('');
  
  setTimeout(checkSupabase, CHECK_INTERVAL);
}

// Start checking
checkSupabase();

