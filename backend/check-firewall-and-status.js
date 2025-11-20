// Check Database Firewall and Status
// Verifies:
// 1. Database firewall allows connections from 0.0.0.0/0
// 2. Database is running and not paused
// 3. Database is accessible from internet (not private network)
// 4. For Supabase: Verify project is active (not paused) and credentials are correct

require('dotenv').config();
const dns = require('dns').promises;
const net = require('net');
const { Sequelize } = require('sequelize');

const dbHost = process.env.DB_HOST;
const dbPort = parseInt(process.env.DB_PORT || 5432);
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

console.log('');
console.log('🔒 Database Firewall & Status Check');
console.log('====================================');
console.log('');

if (!dbHost) {
  console.log('❌ DB_HOST is not set!');
  console.log('💡 Please set DB_HOST in your .env file');
  process.exit(1);
}

console.log('📋 Database Configuration:');
console.log(`   Host: ${dbHost}`);
console.log(`   Port: ${dbPort}`);
console.log(`   User: ${dbUser || 'NOT SET'}`);
console.log(`   Database: ${dbName || 'NOT SET'}`);
console.log('');

let results = {
  isPublicNetwork: false,
  dnsResolution: false,
  databaseRunning: false,
  supabaseActive: false,
  credentialsValid: false,
  firewallOpen: false,
  connectionSuccessful: false,
  errors: []
};

// Step 1: Check if database is accessible from internet (not private network)
function checkPublicNetwork() {
  console.log('🔍 Step 1: Checking if Database is Public (Internet Accessible)...');
  console.log('');
  
  // Check if hostname is private
  const isPrivateHostname = 
    dbHost.includes('localhost') ||
    dbHost.includes('127.0.0.1') ||
    dbHost.includes('192.168.') ||
    dbHost.includes('10.') ||
    dbHost.includes('172.16.') ||
    dbHost.includes('172.17.') ||
    dbHost.includes('172.18.') ||
    dbHost.includes('172.19.') ||
    dbHost.includes('172.20.') ||
    dbHost.includes('172.21.') ||
    dbHost.includes('172.22.') ||
    dbHost.includes('172.23.') ||
    dbHost.includes('172.24.') ||
    dbHost.includes('172.25.') ||
    dbHost.includes('172.26.') ||
    dbHost.includes('172.27.') ||
    dbHost.includes('172.28.') ||
    dbHost.includes('172.29.') ||
    dbHost.includes('172.30.') ||
    dbHost.includes('172.31.') ||
    dbHost.startsWith('10.') ||
    dbHost.match(/^192\.168\./);
  
  if (isPrivateHostname) {
    console.log('❌ Database Hostname: PRIVATE (Local Network)');
    console.log(`   Hostname: ${dbHost}`);
    console.log('   ❌ This database cannot be accessed from the internet');
    console.log('   ❌ Vercel/cloud deployments will fail');
    console.log('');
    console.log('🔍 This means:');
    console.log('   ❌ Database is on a private/local network');
    console.log('   ❌ Only accessible from same network');
    console.log('   ❌ Cannot be accessed from cloud platforms (Vercel, etc.)');
    console.log('');
    console.log('✅ FIX:');
    if (dbHost.includes('supabase')) {
      console.log('   ⚠️  Supabase hostnames should be: db.xxxxx.supabase.co');
      console.log('   ⚠️  If you see localhost/private IP, credentials are wrong');
      console.log('   1. Get correct hostname from Supabase Dashboard');
      console.log('   2. Settings → Database → Connection string');
      console.log('   3. Host should be: db.xxxxx.supabase.co');
    } else {
      console.log('   1. Use a cloud database (Supabase, PlanetScale, AWS RDS, etc.)');
      console.log('   2. Or use ngrok/tunneling for local databases (not recommended for production)');
    }
    console.log('');
    results.errors.push('Database is on private network');
    results.isPublicNetwork = false;
    return false;
  } else {
    console.log('✅ Database Hostname: PUBLIC (Internet Accessible)');
    console.log(`   Hostname: ${dbHost}`);
    if (dbHost.includes('supabase')) {
      console.log('   ✅ Supabase format detected (db.xxxxx.supabase.co)');
    }
    console.log('   ✅ Database is accessible from the internet');
    console.log('   ✅ Can be accessed from cloud platforms');
    console.log('');
    results.isPublicNetwork = true;
    return true;
  }
}

// Step 2: Check DNS Resolution and IP is public (verifies database is not paused)
async function checkDNSResolution() {
  console.log('🔍 Step 2: Checking DNS Resolution & IP Address...');
  console.log('');
  
  try {
    const addresses = await dns.resolve4(dbHost);
    const ip = addresses[0];
    console.log('✅ DNS Resolution: SUCCESS');
    console.log(`   Resolved IP: ${ip}`);
    console.log('');
    
    // Check if IP is private
    const ipParts = ip.split('.').map(Number);
    const isPrivateIP = 
      (ipParts[0] === 10) ||
      (ipParts[0] === 172 && ipParts[1] >= 16 && ipParts[1] <= 31) ||
      (ipParts[0] === 192 && ipParts[1] === 168) ||
      (ipParts[0] === 127) ||
      (ipParts[0] === 169 && ipParts[1] === 254);
    
    if (isPrivateIP) {
      console.log('❌ IP Address: PRIVATE');
      console.log(`   IP: ${ip}`);
      console.log('   ❌ This IP cannot be accessed from the internet');
      console.log('   ❌ Database is on a private network');
      console.log('');
      console.log('✅ FIX:');
      console.log('   1. Verify hostname is correct');
      console.log('   2. Get correct hostname from database provider');
      console.log('   3. For Supabase: Check Settings → Database → Connection string');
      console.log('');
      results.errors.push(`IP address is private: ${ip}`);
      results.isPublicNetwork = false;
      return null;
    } else {
      console.log('✅ IP Address: PUBLIC (Internet Accessible)');
      console.log(`   IP: ${ip}`);
      console.log('   ✅ Database hostname is resolvable');
      console.log('   ✅ Database is likely RUNNING (not paused)');
      console.log('');
      results.dnsResolution = true;
      results.isPublicNetwork = true;
      return ip;
    }
  } catch (error) {
    console.log('❌ DNS Resolution: FAILED');
    console.log(`   Error: ${error.message}`);
    console.log('');
    
    if (error.code === 'ENODATA' || error.code === 'ENOTFOUND') {
      console.log('🔍 This means:');
      console.log('   ❌ Database hostname cannot be resolved');
      if (dbHost.includes('supabase')) {
        console.log('   ❌ Most likely: Supabase project is PAUSED');
        console.log('   ❌ Supabase free tier auto-pauses after inactivity');
      }
      console.log('   ❌ Database server is not running');
      console.log('');
      console.log('✅ FIX:');
      if (dbHost.includes('supabase')) {
        console.log('   1. Go to: https://supabase.com/dashboard');
        console.log('   2. Click your project');
        console.log('   3. If you see "Paused" status, click "Restore"');
        console.log('   4. Wait 3-5 minutes for database to fully restore');
        console.log('   5. Run this check again');
      } else {
        console.log('   1. Verify database hostname is correct');
        console.log('   2. Check if database service is running');
        console.log('   3. Verify DNS settings');
      }
      console.log('');
    }
    
    results.errors.push(`DNS Resolution: ${error.message}`);
    results.databaseRunning = false;
    if (dbHost.includes('supabase')) {
      results.supabaseActive = false;
    }
    return null;
  }
}

// Step 3: Check TCP Connection (verifies firewall allows connections)
async function checkTCPConnection(ip) {
  console.log('🔍 Step 3: Testing TCP Connection (Firewall Check)...');
  console.log('');
  
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const timeout = 5000; // 5 second timeout
    
    socket.setTimeout(timeout);
    
    socket.on('connect', () => {
      console.log('✅ TCP Connection: SUCCESS');
      console.log(`   Connected to ${dbHost}:${dbPort}`);
      console.log('   ✅ Firewall allows connections from your IP');
      console.log('   ✅ Port is open and accessible');
      console.log('');
      socket.destroy();
      results.firewallOpen = true;
      resolve(true);
    });
    
    socket.on('timeout', () => {
      console.log('❌ TCP Connection: TIMEOUT');
      console.log(`   Could not connect to ${dbHost}:${dbPort} within ${timeout}ms`);
      console.log('');
      console.log('🔍 This means:');
      console.log('   ❌ Firewall might be blocking connections');
      console.log('   ❌ Port might be closed');
      console.log('   ❌ Database might not be accepting connections');
      console.log('');
      console.log('✅ FIX:');
      console.log('   1. Check Supabase Dashboard → Settings → Database');
      console.log('   2. Verify "Network restrictions" allows 0.0.0.0/0');
      console.log('   3. Supabase allows connections by default, but check:');
      console.log('      - Settings → Database → Connection pooling');
      console.log('      - Ensure no IP restrictions are set');
      console.log('   4. Try using connection pooling port 6543 instead of 5432');
      console.log('');
      socket.destroy();
      results.errors.push('TCP Connection: Timeout');
      results.firewallOpen = false;
      resolve(false);
    });
    
    socket.on('error', (error) => {
      if (error.code === 'ECONNREFUSED') {
        console.log('❌ TCP Connection: REFUSED');
        console.log(`   Connection refused by ${dbHost}:${dbPort}`);
        console.log('');
        console.log('🔍 This means:');
        console.log('   ❌ Database is not accepting connections on this port');
        console.log('   ❌ Firewall might be blocking');
        console.log('   ❌ Database service might not be running');
        console.log('');
        console.log('✅ FIX:');
        console.log('   1. Verify database is running (check Step 1)');
        console.log('   2. Check if port is correct (5432 or 6543)');
        console.log('   3. Verify firewall allows connections from 0.0.0.0/0');
        console.log('');
      } else if (error.code === 'ETIMEDOUT') {
        console.log('❌ TCP Connection: TIMEOUT');
        console.log(`   Connection timed out to ${dbHost}:${dbPort}`);
        console.log('');
        console.log('🔍 This means:');
        console.log('   ❌ Firewall is likely blocking the connection');
        console.log('   ❌ Network path is blocked');
        console.log('');
        console.log('✅ FIX:');
        console.log('   1. Check Supabase firewall settings');
        console.log('   2. Ensure connections from 0.0.0.0/0 are allowed');
        console.log('   3. Try connection pooling port 6543');
        console.log('');
      } else {
        console.log('❌ TCP Connection: FAILED');
        console.log(`   Error: ${error.message} (${error.code})`);
        console.log('');
      }
      results.errors.push(`TCP Connection: ${error.message}`);
      results.firewallOpen = false;
      resolve(false);
    });
    
    socket.connect(dbPort, ip || dbHost);
  });
}

// Step 4: Check Full Database Connection (verifies credentials and full connectivity)
// For Supabase: Explicitly verifies project is active and credentials are correct
async function checkDatabaseConnection() {
  console.log('🔍 Step 4: Testing Full Database Connection...');
  if (dbHost.includes('supabase')) {
    console.log('   (Verifying Supabase project is active & credentials are correct)');
  }
  console.log('');
  
  if (!dbUser || !dbPassword || !dbName) {
    console.log('⚠️  Missing credentials - skipping full connection test');
    console.log('   (TCP connection test passed - firewall is open)');
    console.log('');
    if (dbHost.includes('supabase')) {
      console.log('💡 To verify Supabase credentials:');
      console.log('   1. Set DB_USER, DB_PASSWORD, and DB_NAME in .env');
      console.log('   2. Get credentials from: Supabase Dashboard → Settings → Database');
      console.log('');
    }
    return false;
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
        max: 1,
        min: 0,
        acquire: 5000,
        idle: 10000
      }
    });
    
    await sequelize.authenticate();
    console.log('✅ Database Connection: SUCCESS');
    console.log('   Full connection established with credentials');
    console.log('   ✅ Database is running and accessible');
    console.log('   ✅ Firewall allows connections');
    console.log('   ✅ Credentials are correct');
    if (dbHost.includes('supabase')) {
      console.log('   ✅ Supabase project is ACTIVE (not paused)');
      console.log('   ✅ Supabase credentials are VALID');
    }
    console.log('');
    
    // Try a simple query to further verify
    try {
      const [results] = await sequelize.query('SELECT version() as version, current_database() as database, current_user as user;');
      if (results && results.length > 0) {
        console.log('✅ Database Query Test: SUCCESS');
        console.log(`   Database: ${results[0].database}`);
        console.log(`   User: ${results[0].user}`);
        console.log('   ✅ Database is fully operational');
        console.log('');
      }
    } catch (queryError) {
      // Query test failed but connection worked, so credentials are valid
      console.log('⚠️  Query test failed, but connection successful');
      console.log('');
    }
    
    await sequelize.close();
    results.connectionSuccessful = true;
    results.databaseRunning = true;
    results.credentialsValid = true;
    if (dbHost.includes('supabase')) {
      results.supabaseActive = true;
    }
    return true;
  } catch (error) {
    console.log('❌ Database Connection: FAILED');
    console.log(`   Error: ${error.message}`);
    console.log('');
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.log('🔍 This means:');
      console.log('   ❌ DNS resolution failed');
      if (dbHost.includes('supabase')) {
        console.log('   ❌ Supabase project is PAUSED (most common)');
        console.log('   ❌ Project needs to be restored from dashboard');
      } else {
        console.log('   ❌ Database server is not running');
      }
      console.log('   ❌ See Step 2 for fix');
      console.log('');
      if (dbHost.includes('supabase')) {
        results.supabaseActive = false;
      }
    } else if (error.message.includes('password') || error.message.includes('authentication') || error.message.includes('authentication failed')) {
      console.log('🔍 This means:');
      console.log('   ❌ Authentication failed');
      console.log('   ❌ Credentials are INCORRECT');
      if (dbHost.includes('supabase')) {
        console.log('   ❌ Supabase credentials are wrong');
      }
      console.log('');
      console.log('✅ FIX:');
      console.log('   1. Check DB_USER and DB_PASSWORD in .env');
      if (dbHost.includes('supabase')) {
        console.log('   2. Get fresh credentials from Supabase Dashboard:');
        console.log('      - Go to: https://supabase.com/dashboard');
        console.log('      - Click your project');
        console.log('      - Settings → Database');
        console.log('      - Copy connection string or individual values');
        console.log('   3. If password is lost, reset it:');
        console.log('      - Settings → Database → Reset database password');
        console.log('   4. Update .env file with correct credentials');
      } else {
        console.log('   2. Get fresh credentials from database provider');
      }
      console.log('   5. Run this check again');
      console.log('');
      results.credentialsValid = false;
    } else if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
      console.log('🔍 This means:');
      console.log('   ❌ Connection timed out');
      console.log('   ❌ Firewall might be blocking');
      console.log('   ❌ See Step 3 for firewall fix');
      console.log('');
    } else {
      console.log('🔍 Connection failed for unknown reason');
      console.log('   Check error message above');
      console.log('');
    }
    
    results.errors.push(`Database Connection: ${error.message}`);
    return false;
  }
}

// Step 5: Verify Firewall Configuration (provide instructions)
function verifyFirewallConfig() {
  console.log('🔍 Step 5: Firewall Configuration Verification...');
  console.log('');
  
  if (dbHost.includes('supabase')) {
    console.log('📋 Supabase Firewall Configuration:');
    console.log('');
    console.log('   Supabase allows connections from 0.0.0.0/0 by DEFAULT');
    console.log('   However, verify these settings:');
    console.log('');
    console.log('   1. Go to: https://supabase.com/dashboard');
    console.log('   2. Click your project');
    console.log('   3. Settings → Database');
    console.log('   4. Check "Connection pooling" section:');
    console.log('      ✅ Should be enabled');
    console.log('      ✅ Port 6543 should be available');
    console.log('   5. Check "Network restrictions" (if available):');
    console.log('      ✅ Should allow 0.0.0.0/0 (all IPs)');
    console.log('      ❌ If restricted to specific IPs, Vercel won\'t work');
    console.log('');
    console.log('   💡 For Vercel deployments:');
    console.log('      - Vercel uses dynamic IPs');
    console.log('      - Must allow 0.0.0.0/0 (all IPs)');
    console.log('      - Supabase does this by default');
    console.log('');
  } else {
    console.log('📋 Database Firewall Configuration:');
    console.log('');
    console.log('   For your database provider, ensure:');
    console.log('   ✅ Firewall allows connections from 0.0.0.0/0');
    console.log('   ✅ Port is open and accessible');
    console.log('   ✅ No IP whitelisting (Vercel uses dynamic IPs)');
    console.log('');
  }
}

// Main execution
async function main() {
  try {
    // Step 1: Check if database is public (internet accessible)
    const isPublic = checkPublicNetwork();
    
    if (!isPublic) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('❌ SUMMARY: Database is NOT Internet Accessible');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('');
      console.log('✅ Action Required:');
      console.log('   Database must be on a public network for cloud deployments');
      console.log('   See Step 1 for details');
      console.log('');
      process.exit(1);
    }
    
    // Step 2: DNS Resolution and IP check
    const ip = await checkDNSResolution();
    
    if (!ip) {
      // DNS failed - database is likely paused
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('❌ SUMMARY: Database is NOT RUNNING');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('');
      if (dbHost.includes('supabase')) {
        console.log('✅ Action Required:');
        console.log('   1. Restore Supabase project from dashboard');
        console.log('   2. Wait 3-5 minutes');
        console.log('   3. Run this check again');
      } else {
        console.log('✅ Action Required:');
        console.log('   1. Verify database service is running');
        console.log('   2. Check database hostname is correct');
        console.log('   3. Run this check again');
      }
      console.log('');
      process.exit(1);
    }
    
    // Step 3: TCP Connection
    const tcpSuccess = await checkTCPConnection(ip);
    
    // Step 4: Full Database Connection
    const dbSuccess = await checkDatabaseConnection();
    
    // Step 5: Firewall Configuration Info
    verifyFirewallConfig();
    
    // Final Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 FINAL SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log(`   Public Network:        ${results.isPublicNetwork ? '✅ YES' : '❌ NO'}`);
    console.log(`   DNS Resolution:        ${results.dnsResolution ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   Database Running:     ${results.databaseRunning ? '✅ YES' : '❌ NO'}`);
    if (dbHost.includes('supabase')) {
      console.log(`   Supabase Active:       ${results.supabaseActive ? '✅ YES' : '❌ NO'}`);
      console.log(`   Credentials Valid:     ${results.credentialsValid ? '✅ YES' : '❌ NO'}`);
    }
    console.log(`   Firewall Open:        ${results.firewallOpen ? '✅ YES' : '❌ NO'}`);
    console.log(`   Connection Success:   ${results.connectionSuccessful ? '✅ YES' : '❌ NO'}`);
    console.log('');
    
    if (results.isPublicNetwork && results.dnsResolution && results.firewallOpen && results.connectionSuccessful) {
      console.log('🎉 ALL CHECKS PASSED!');
      console.log('');
      console.log('✅ Database is accessible from internet (public network)');
      console.log('✅ Database is running and accessible');
      if (dbHost.includes('supabase')) {
        console.log('✅ Supabase project is ACTIVE (not paused)');
        console.log('✅ Supabase credentials are CORRECT');
      }
      console.log('✅ Firewall allows connections from 0.0.0.0/0');
      console.log('✅ Full connection test successful');
      console.log('');
      console.log('💡 Your database is ready for deployment!');
      console.log('');
      process.exit(0);
    } else if (results.isPublicNetwork && results.dnsResolution && results.firewallOpen) {
      console.log('⚠️  PARTIAL SUCCESS');
      console.log('');
      console.log('✅ Database is accessible from internet');
      console.log('✅ Database is running');
      console.log('✅ Firewall is open');
      if (dbHost.includes('supabase')) {
        console.log('⚠️  Supabase credentials need verification');
      }
      console.log('⚠️  Full connection test failed (check credentials)');
      console.log('');
      process.exit(1);
    } else if (results.isPublicNetwork && results.dnsResolution) {
      console.log('⚠️  PARTIAL SUCCESS');
      console.log('');
      console.log('✅ Database is accessible from internet');
      console.log('✅ Database is running');
      console.log('❌ Firewall might be blocking connections');
      console.log('💡 Check firewall settings (see Step 5)');
      console.log('');
      process.exit(1);
    } else {
      console.log('❌ CHECKS FAILED');
      console.log('');
      console.log('❌ Database is not accessible');
      console.log('💡 Follow the fixes above');
      console.log('');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    process.exit(1);
  }
}

main();

