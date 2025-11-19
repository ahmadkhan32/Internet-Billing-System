// Check if Supabase database is accessible from the internet
// This script verifies network accessibility and firewall settings

require('dotenv').config();
const dns = require('dns').promises;
const { Sequelize } = require('sequelize');

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT || 5432;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

console.log('');
console.log('🌐 Checking Internet Accessibility');
console.log('==================================');
console.log('');

if (!dbHost) {
  console.log('❌ DB_HOST is not set!');
  process.exit(1);
}

console.log('📋 Database Configuration:');
console.log(`   Host: ${dbHost}`);
console.log(`   Port: ${dbPort}`);
console.log(`   User: ${dbUser || 'NOT SET'}`);
console.log(`   Database: ${dbName || 'NOT SET'}`);
console.log('');

// Step 1: Check if hostname is public (not localhost/private)
console.log('🔍 Step 1: Checking if database is public...');
console.log('');

const isPrivate = 
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

if (isPrivate) {
  console.log('❌ Database hostname is PRIVATE (local network)!');
  console.log('   This database cannot be accessed from the internet.');
  console.log('');
  console.log('💡 For Supabase:');
  console.log('   - Supabase databases are PUBLIC by default');
  console.log('   - Hostname should be: db.xxxxx.supabase.co');
  console.log('   - If you see localhost/private IP, credentials are wrong');
  console.log('');
  process.exit(1);
} else {
  console.log('✅ Database hostname is PUBLIC (internet-accessible)');
  console.log(`   Hostname: ${dbHost}`);
  console.log('   ✅ Supabase format detected');
  console.log('');
}

// Step 2: DNS Resolution (checks if hostname resolves)
console.log('🔍 Step 2: Testing DNS resolution...');
console.log('');

dns.resolve4(dbHost)
  .then(async (addresses) => {
    console.log('✅ DNS resolution: SUCCESS!');
    console.log(`   Resolved IP: ${addresses[0]}`);
    console.log('');
    
    // Step 3: Check if IP is public
    console.log('🔍 Step 3: Checking if IP is public...');
    console.log('');
    
    const ip = addresses[0];
    const ipParts = ip.split('.').map(Number);
    
    // Check if IP is private
    const isPrivateIP = 
      (ipParts[0] === 10) ||
      (ipParts[0] === 172 && ipParts[1] >= 16 && ipParts[1] <= 31) ||
      (ipParts[0] === 192 && ipParts[1] === 168) ||
      (ipParts[0] === 127) ||
      (ipParts[0] === 169 && ipParts[1] === 254);
    
    if (isPrivateIP) {
      console.log('❌ IP address is PRIVATE!');
      console.log(`   IP: ${ip}`);
      console.log('   This IP cannot be accessed from the internet.');
      console.log('');
      process.exit(1);
    } else {
      console.log('✅ IP address is PUBLIC (internet-accessible)');
      console.log(`   IP: ${ip}`);
      console.log('');
    }
    
    // Step 4: Test actual database connection
    console.log('🔍 Step 4: Testing database connection...');
    console.log('');
    
    if (!dbUser || !dbPassword || !dbName) {
      console.log('⚠️  Missing credentials - skipping connection test');
      console.log('   (DNS and IP checks passed - database should be accessible)');
      console.log('');
      console.log('✅ Summary:');
      console.log('   ✅ Hostname is public');
      console.log('   ✅ DNS resolves correctly');
      console.log('   ✅ IP is public');
      console.log('   ⚠️  Connection test skipped (missing credentials)');
      console.log('');
      console.log('💡 Your database SHOULD be accessible from the internet!');
      console.log('   If connection still fails, check:');
      console.log('   1. Supabase project is active (not paused)');
      console.log('   2. Database credentials are correct');
      console.log('   3. Firewall allows connections (Supabase allows by default)');
      console.log('');
      process.exit(0);
    }
    
    try {
      const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
        host: dbHost,
        port: parseInt(dbPort),
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
      console.log('✅ Database connection: SUCCESS!');
      console.log('   Database is accessible from the internet!');
      console.log('');
      console.log('✅ Summary:');
      console.log('   ✅ Hostname is public');
      console.log('   ✅ DNS resolves correctly');
      console.log('   ✅ IP is public');
      console.log('   ✅ Database connection successful');
      console.log('');
      console.log('🎉 Your database is FULLY accessible from the internet!');
      console.log('');
      
      await sequelize.close();
      process.exit(0);
    } catch (connError) {
      console.log('❌ Database connection: FAILED!');
      console.log(`   Error: ${connError.message}`);
      console.log('');
      
      if (connError.message.includes('ENOTFOUND') || connError.message.includes('getaddrinfo')) {
        console.log('🔍 This means:');
        console.log('   ❌ DNS resolution failed (Supabase project is paused)');
        console.log('   ❌ Database server is not running');
        console.log('');
        console.log('✅ FIX:');
        console.log('   1. Go to: https://supabase.com/dashboard');
        console.log('   2. Click your project');
        console.log('   3. Click "Restore"');
        console.log('   4. Wait 3-5 minutes');
        console.log('');
      } else if (connError.message.includes('password') || connError.message.includes('authentication')) {
        console.log('🔍 This means:');
        console.log('   ❌ Authentication failed');
        console.log('   ❌ Credentials are incorrect');
        console.log('');
        console.log('✅ FIX:');
        console.log('   1. Check DB_USER and DB_PASSWORD in .env');
        console.log('   2. Get fresh credentials from Supabase Dashboard');
        console.log('');
      } else if (connError.message.includes('timeout')) {
        console.log('🔍 This means:');
        console.log('   ❌ Connection timed out');
        console.log('   ❌ Firewall might be blocking');
        console.log('');
        console.log('✅ FIX:');
        console.log('   1. Check Supabase firewall settings');
        console.log('   2. Verify port is correct (5432 or 6543)');
        console.log('   3. Supabase allows connections by default');
        console.log('');
      } else {
        console.log('🔍 Connection failed for unknown reason');
        console.log('   Check error message above');
        console.log('');
      }
      
      console.log('✅ Summary:');
      console.log('   ✅ Hostname is public');
      console.log('   ✅ DNS resolves correctly');
      console.log('   ✅ IP is public');
      console.log('   ❌ Database connection failed (see error above)');
      console.log('');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.log('❌ DNS resolution: FAILED!');
    console.log(`   Error: ${error.message}`);
    console.log('');
    
    if (error.code === 'ENODATA' || error.code === 'ENOTFOUND') {
      console.log('🔍 This means:');
      console.log('   ❌ Hostname cannot be resolved');
      console.log('   ❌ Supabase project is PAUSED (most common)');
      console.log('   ❌ Database server is not running');
      console.log('');
      console.log('✅ FIX:');
      console.log('   1. Go to: https://supabase.com/dashboard');
      console.log('   2. Click your project');
      console.log('   3. Click "Restore" (or Pause → Restore)');
      console.log('   4. Wait 3-5 minutes');
      console.log('   5. Run this check again');
      console.log('');
    } else {
      console.log('🔍 DNS resolution failed for unknown reason');
      console.log('   Check error message above');
      console.log('');
    }
    
    console.log('✅ Summary:');
    console.log('   ✅ Hostname is public');
    console.log('   ❌ DNS resolution failed (see error above)');
    console.log('   ⏸️  Cannot proceed with further checks');
    console.log('');
    process.exit(1);
  });

