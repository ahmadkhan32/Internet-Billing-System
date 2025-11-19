// Comprehensive Database Diagnostic - Finds the Real Issue
const path = require('path');
const fs = require('fs');
const dns = require('dns');
const https = require('https');

console.log('🔍 Comprehensive Database Diagnostic');
console.log('=====================================\n');

// Find .env file
let envPath = './backend/.env';
if (!fs.existsSync(envPath)) {
  envPath = './.env';
  if (!fs.existsSync(envPath)) {
    console.error('❌ Cannot find .env file!');
    console.error('💡 Create backend/.env file with database credentials\n');
    process.exit(1);
  }
}

require('dotenv').config({ path: envPath });

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT || '5432';

if (!dbHost) {
  console.error('❌ DB_HOST is not set in .env file!\n');
  process.exit(1);
}

console.log('📋 Current Configuration:');
console.log(`   DB_HOST: ${dbHost}`);
console.log(`   DB_PORT: ${dbPort}`);
console.log(`   DB_USER: ${process.env.DB_USER || 'NOT SET'}`);
console.log(`   DB_NAME: ${process.env.DB_NAME || 'NOT SET'}\n`);

// Step 1: Verify hostname format
console.log('🔍 Step 1: Verifying Hostname Format...\n');

if (!dbHost.includes('supabase.co')) {
  console.log('❌ Hostname does not contain "supabase.co"');
  console.log('💡 This might not be a Supabase hostname\n');
} else if (!dbHost.startsWith('db.')) {
  console.log('⚠️  Hostname should start with "db."');
  console.log('💡 Correct format: db.xxxxx.supabase.co\n');
} else {
  console.log('✅ Hostname format looks correct\n');
}

// Step 2: Test DNS Resolution
console.log('🔍 Step 2: Testing DNS Resolution...\n');

dns.lookup(dbHost, { all: true }, (err, addresses) => {
  if (err) {
    console.log('❌ DNS Resolution FAILED!\n');
    console.log(`Error Code: ${err.code}`);
    console.log(`Error Message: ${err.message}\n`);
    
    // Detailed error analysis
    if (err.code === 'ENOTFOUND') {
      console.log('🔍 Error Analysis: ENOTFOUND\n');
      console.log('This means the hostname cannot be resolved by DNS.\n');
      console.log('💡 Possible Causes:\n');
      console.log('   1. ❌ Supabase project is PAUSED (most common)');
      console.log('      - Even if dashboard shows "Active", project might be paused');
      console.log('      - Free tier projects auto-pause after inactivity\n');
      console.log('   2. ❌ Wrong hostname');
      console.log('      - Hostname might be incorrect or outdated');
      console.log('      - Project might have been recreated with new hostname\n');
      console.log('   3. ❌ Project was deleted or doesn\'t exist');
      console.log('      - Project might have been deleted');
      console.log('      - Account might have been suspended\n');
      console.log('   4. ❌ Network/DNS issue');
      console.log('      - Internet connection problem');
      console.log('      - DNS server issue\n');
      
      console.log('🔧 SOLUTIONS (Try in order):\n');
      console.log('   SOLUTION 1: Force Restore Project');
      console.log('   ─────────────────────────────────');
      console.log('   1. Go to: https://supabase.com/dashboard');
      console.log('   2. Click your project');
      console.log('   3. If you see "Paused" → Click "Restore"');
      console.log('   4. If you see "Active" → Try this:');
      console.log('      a. Click "Pause" (if available)');
      console.log('      b. Wait 30 seconds');
      console.log('      c. Click "Restore"');
      console.log('   5. Wait 3-5 minutes for database to fully start');
      console.log('   6. Run this diagnostic again\n');
      
      console.log('   SOLUTION 2: Verify Hostname is Correct');
      console.log('   ──────────────────────────────────────');
      console.log('   1. Go to: Supabase Dashboard → Settings → Database');
      console.log('   2. Connection string → URI tab');
      console.log('   3. Copy the connection string');
      console.log('   4. Extract hostname (between @ and :)');
      console.log('   5. Compare with DB_HOST in backend/.env');
      console.log('   6. If different, update backend/.env\n');
      
      console.log('   SOLUTION 3: Get Fresh Connection String');
      console.log('   ─────────────────────────────────────────');
      console.log('   1. Go to: Supabase Dashboard → Settings → Database');
      console.log('   2. Connection string → URI tab');
      console.log('   3. Copy the FULL connection string');
      console.log('   4. Run: cd backend && .\\get-supabase-credentials.ps1');
      console.log('   5. Paste connection string');
      console.log('   6. This will update all credentials\n');
      
      console.log('   SOLUTION 4: Create New Supabase Project');
      console.log('   ───────────────────────────────────────');
      console.log('   If project keeps failing, create a new one:');
      console.log('   1. Go to: https://supabase.com/dashboard');
      console.log('   2. Click "New Project"');
      console.log('   3. Create new project');
      console.log('   4. Get connection string from new project');
      console.log('   5. Update backend/.env with new credentials\n');
      
      console.log('   SOLUTION 5: Use Connection Pooling Port');
      console.log('   ────────────────────────────────────────');
      console.log('   1. Open backend/.env');
      console.log('   2. Change: DB_PORT=5432');
      console.log('   3. To: DB_PORT=6543');
      console.log('   4. Save and test again\n');
      
      console.log('⚠️  IMPORTANT NOTES:\n');
      console.log('   - Supabase free tier projects auto-pause after 1 week');
      console.log('   - Dashboard might show "Active" but project is actually paused');
      console.log('   - Always restore project even if it says active');
      console.log('   - Wait 3-5 minutes after restoring before testing\n');
      
    } else if (err.code === 'ETIMEDOUT') {
      console.log('🔍 Error Analysis: DNS Timeout\n');
      console.log('DNS server is not responding.\n');
      console.log('🔧 Fix:');
      console.log('   1. Check internet connection');
      console.log('   2. Try different DNS server (8.8.8.8)');
      console.log('   3. Check firewall settings\n');
    } else {
      console.log(`🔍 Error Analysis: ${err.code}\n`);
      console.log(`Error: ${err.message}\n`);
    }
    
    // Test alternative hostname format
    console.log('🔍 Testing Alternative Hostname Formats...\n');
    
    const alternatives = [
      dbHost.replace('db.', ''),
      dbHost.replace('.supabase.co', ''),
      `https://${dbHost}`,
      `http://${dbHost}`
    ];
    
    console.log('💡 If hostname is wrong, try these formats:');
    alternatives.forEach((alt, i) => {
      console.log(`   ${i + 1}. ${alt}`);
    });
    console.log('');
    
    process.exit(1);
  } else {
    console.log('✅ DNS Resolution SUCCESS!\n');
    console.log(`Resolved to:`);
    addresses.forEach((addr, i) => {
      console.log(`   ${i + 1}. ${addr.address} (${addr.family === 4 ? 'IPv4' : 'IPv6'})`);
    });
    console.log('');
    
    // Step 3: Test if hostname is reachable
    console.log('🔍 Step 3: Testing Hostname Reachability...\n');
    
    testHostnameReachability(dbHost, dbPort);
  }
});

function testHostnameReachability(host, port) {
  const options = {
    hostname: host,
    port: parseInt(port),
    method: 'HEAD',
    timeout: 5000,
    rejectUnauthorized: false
  };
  
  const req = https.request(options, (res) => {
    console.log(`✅ Hostname is reachable!`);
    console.log(`   Status: ${res.statusCode}\n`);
    console.log('💡 DNS is working, but database connection might still fail.');
    console.log('💡 This usually means:');
    console.log('   1. Supabase project is paused (most common)');
    console.log('   2. Wrong port (try 6543)');
    console.log('   3. Wrong credentials\n');
    console.log('🔧 Next Steps:');
    console.log('   1. Restore Supabase project');
    console.log('   2. Try port 6543 (connection pooling)');
    console.log('   3. Test database connection: node backend/check-db.js\n');
    process.exit(0);
  });
  
  req.on('error', (err) => {
    console.log(`⚠️  Cannot reach hostname on port ${port}`);
    console.log(`   Error: ${err.message}\n`);
    console.log('💡 This is normal - Supabase uses PostgreSQL, not HTTPS');
    console.log('💡 DNS is working, so the issue is likely:');
    console.log('   1. Supabase project is paused');
    console.log('   2. Wrong port or credentials\n');
    console.log('🔧 Fix:');
    console.log('   1. Restore Supabase project');
    console.log('   2. Get fresh connection string');
    console.log('   3. Use port 6543 (connection pooling)\n');
    process.exit(0);
  });
  
  req.on('timeout', () => {
    req.destroy();
    console.log(`⚠️  Connection timeout`);
    console.log('💡 Hostname exists but might not be accessible\n');
    process.exit(0);
  });
  
  req.end();
}

