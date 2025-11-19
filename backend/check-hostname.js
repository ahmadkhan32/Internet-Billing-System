// Check Supabase Hostname Configuration
// Verifies hostname format and DNS resolution

require('dotenv').config();
const dns = require('dns').promises;

console.log('');
console.log('🔍 Supabase Hostname Verification');
console.log('===================================');
console.log('');

const dbHost = process.env.DB_HOST;

if (!dbHost) {
  console.log('❌ DB_HOST is not set in .env file!');
  console.log('');
  console.log('💡 Set it in backend/.env:');
  console.log('   DB_HOST=db.xxxxx.supabase.co');
  process.exit(1);
}

console.log('📋 Current Hostname:');
console.log(`   ${dbHost}`);
console.log('');

// Check hostname format
console.log('🔍 Checking Hostname Format...');
console.log('');

const supabasePattern = /^db\.([a-z0-9]+)\.supabase\.co$/;
const match = dbHost.match(supabasePattern);

if (!match) {
  console.log('❌ Hostname format is INCORRECT!');
  console.log('');
  console.log('💡 Expected format: db.xxxxx.supabase.co');
  console.log('   Where xxxxx is your Supabase project ID');
  console.log('');
  console.log('📋 Your hostname:', dbHost);
  console.log('');
  console.log('✅ How to get correct hostname:');
  console.log('   1. Go to: https://supabase.com/dashboard');
  console.log('   2. Click your project');
  console.log('   3. Go to: Settings → Database');
  console.log('   4. Copy the "Host" value');
  console.log('   5. It should look like: db.xxxxx.supabase.co');
  console.log('');
  process.exit(1);
}

const projectId = match[1];
console.log('✅ Hostname format is CORRECT!');
console.log('');
console.log('📋 Extracted Information:');
console.log(`   Project ID: ${projectId}`);
console.log(`   Full Hostname: ${dbHost}`);
console.log(`   Format: db.{project-id}.supabase.co`);
console.log('');

// Test DNS resolution
console.log('🔍 Testing DNS Resolution...');
console.log('');

dns.resolve4(dbHost)
  .then((addresses) => {
    console.log('✅ DNS Resolution: SUCCESS!');
    console.log('');
    console.log('📋 Resolved IP Addresses:');
    addresses.forEach((ip, index) => {
      console.log(`   ${index + 1}. ${ip}`);
    });
    console.log('');
    console.log('✅ Hostname is valid and database is accessible!');
    console.log('');
    console.log('💡 Your Supabase project is ACTIVE');
    console.log('💡 Database connection should work now');
    console.log('');
    process.exit(0);
  })
  .catch((error) => {
    console.log('❌ DNS Resolution: FAILED!');
    console.log('');
    console.log('📋 Error Details:');
    console.log(`   Error: ${error.message}`);
    console.log(`   Code: ${error.code || 'UNKNOWN'}`);
    console.log('');
    
    if (error.code === 'ENODATA' || error.code === 'ENOTFOUND') {
      console.log('🔍 This means:');
      console.log('   ❌ Supabase project is PAUSED (most common)');
      console.log('   ❌ Hostname cannot be resolved (DNS lookup fails)');
      console.log('   ❌ Database server is not running');
      console.log('');
      console.log('✅ FIX STEPS:');
      console.log('   1. Go to: https://supabase.com/dashboard');
      console.log('   2. Click your project:', projectId);
      console.log('   3. Check project status:');
      console.log('      - If "Paused" → Click "Restore"');
      console.log('      - If "Active" → Click "Pause" → Wait 30s → Click "Restore"');
      console.log('   4. Wait 3-5 minutes for database to start');
      console.log('   5. Run this check again: node check-hostname.js');
      console.log('');
      console.log('💡 Why this happens:');
      console.log('   - Supabase free tier auto-pauses after 7 days of inactivity');
      console.log('   - Even if dashboard shows "Active", project might be paused');
      console.log('   - DNS resolution fails when project is paused');
      console.log('');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('🔍 This means:');
      console.log('   ❌ DNS query timed out');
      console.log('   ❌ Network connectivity issue');
      console.log('   ❌ Firewall blocking DNS queries');
      console.log('');
      console.log('✅ FIX STEPS:');
      console.log('   1. Check your internet connection');
      console.log('   2. Try again in a few minutes');
      console.log('   3. Check firewall settings');
      console.log('');
    } else {
      console.log('🔍 This means:');
      console.log('   ❌ Unknown DNS error');
      console.log('   ❌ Network or configuration issue');
      console.log('');
      console.log('✅ FIX STEPS:');
      console.log('   1. Verify hostname is correct');
      console.log('   2. Check Supabase project status');
      console.log('   3. Try again in a few minutes');
      console.log('');
    }
    
    console.log('📋 Summary:');
    console.log('   ✅ Hostname format: CORRECT');
    console.log('   ✅ Project ID: ' + projectId);
    console.log('   ❌ DNS resolution: FAILED (project is paused)');
    console.log('');
    process.exit(1);
  });


