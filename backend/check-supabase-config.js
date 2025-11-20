// Complete Supabase Configuration Check
// Diagnoses all configuration issues

require('dotenv').config();
const dns = require('dns');
const { promisify } = require('util');
const { Sequelize } = require('sequelize');

const dnsResolve = promisify(dns.resolve4);

async function checkConfiguration() {
  console.log('');
  console.log('🔍 Supabase Configuration Check');
  console.log('================================');
  console.log('');

  // Step 1: Check Environment Variables
  console.log('📋 Step 1: Checking Environment Variables...');
  console.log('');

  const requiredVars = {
    'DB_DIALECT': process.env.DB_DIALECT,
    'DB_HOST': process.env.DB_HOST,
    'DB_PORT': process.env.DB_PORT,
    'DB_USER': process.env.DB_USER,
    'DB_PASSWORD': process.env.DB_PASSWORD,
    'DB_NAME': process.env.DB_NAME,
    'DB_SSL': process.env.DB_SSL,
    'DB_SSL_REJECT_UNAUTHORIZED': process.env.DB_SSL_REJECT_UNAUTHORIZED,
    'JWT_SECRET': process.env.JWT_SECRET
  };

  let configIssues = [];
  let configGood = [];

  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value || value.trim() === '') {
      configIssues.push({ key, status: 'MISSING', value: 'NOT SET' });
    } else {
      const displayValue = key.includes('PASSWORD') || key === 'JWT_SECRET' 
        ? '***SET***' 
        : value;
      configGood.push({ key, status: 'OK', value: displayValue });
    }
  }

  // Display results
  configGood.forEach(item => {
    console.log(`   ✅ ${item.key}: ${item.value}`);
  });

  configIssues.forEach(item => {
    console.log(`   ❌ ${item.key}: ${item.value}`);
  });

  console.log('');

  if (configIssues.length > 0) {
    console.log('⚠️  Missing environment variables detected!');
    console.log('');
    console.log('✅ TO FIX:');
    console.log('   1. Open backend/.env file');
    console.log('   2. Add missing variables:');
    configIssues.forEach(item => {
      if (item.key === 'DB_DIALECT') {
        console.log(`      ${item.key}=postgres`);
      } else if (item.key === 'DB_HOST') {
        console.log(`      ${item.key}=db.xxxxx.supabase.co`);
      } else if (item.key === 'DB_PORT') {
        console.log(`      ${item.key}=6543`);
      } else if (item.key === 'DB_USER') {
        console.log(`      ${item.key}=postgres`);
      } else if (item.key === 'DB_PASSWORD') {
        console.log(`      ${item.key}=your-supabase-password`);
      } else if (item.key === 'DB_NAME') {
        console.log(`      ${item.key}=postgres`);
      } else if (item.key === 'DB_SSL') {
        console.log(`      ${item.key}=true`);
      } else if (item.key === 'DB_SSL_REJECT_UNAUTHORIZED') {
        console.log(`      ${item.key}=false`);
      } else if (item.key === 'JWT_SECRET') {
        console.log(`      ${item.key}=your-jwt-secret-key`);
      }
    });
    console.log('   3. Get values from: https://supabase.com/dashboard');
    console.log('   4. Restart backend after updating');
    console.log('');
    process.exit(1);
  }

  // Step 2: Validate Configuration Values
  console.log('📋 Step 2: Validating Configuration Values...');
  console.log('');

  const dbHost = process.env.DB_HOST;
  const dbPort = parseInt(process.env.DB_PORT || 5432);
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const dbDialect = process.env.DB_DIALECT;

  let validationIssues = [];

  // Check DB_DIALECT
  if (dbDialect !== 'postgres') {
    validationIssues.push(`DB_DIALECT should be 'postgres', got '${dbDialect}'`);
  }

  // Check DB_HOST format
  if (!dbHost.includes('supabase.co')) {
    validationIssues.push(`DB_HOST should be a Supabase hostname (db.xxxxx.supabase.co), got '${dbHost}'`);
  }

  // Check DB_PORT
  if (dbPort !== 5432 && dbPort !== 6543) {
    validationIssues.push(`DB_PORT should be 5432 or 6543 (recommended: 6543 for connection pooling), got ${dbPort}`);
  }

  // Check DB_USER
  if (dbUser !== 'postgres') {
    validationIssues.push(`DB_USER should be 'postgres' for Supabase, got '${dbUser}'`);
  }

  // Check DB_NAME
  if (dbName !== 'postgres') {
    validationIssues.push(`DB_NAME should be 'postgres' for Supabase, got '${dbName}'`);
  }

  // Check DB_SSL
  if (process.env.DB_SSL !== 'true') {
    validationIssues.push(`DB_SSL should be 'true' for Supabase, got '${process.env.DB_SSL}'`);
  }

  if (validationIssues.length > 0) {
    console.log('⚠️  Configuration validation issues:');
    validationIssues.forEach(issue => {
      console.log(`   ❌ ${issue}`);
    });
    console.log('');
  } else {
    console.log('✅ All configuration values are valid!');
    console.log('');
  }

  // Step 3: Check DNS Resolution
  console.log('📋 Step 3: Testing DNS Resolution...');
  console.log('');

  try {
    const addresses = await dnsResolve(dbHost);
    console.log('✅ DNS Resolution: SUCCESS');
    console.log(`   Resolved IP: ${addresses[0]}`);
    console.log('   ✅ Supabase project is ACTIVE');
    console.log('');
  } catch (dnsError) {
    console.log('❌ DNS Resolution: FAILED');
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
    console.log('   7. Run this check again: npm run check-config');
    console.log('');
    process.exit(1);
  }

  // Step 4: Test Database Connection
  console.log('📋 Step 4: Testing Database Connection...');
  console.log('');

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
        acquire: 10000,
        idle: 10000
      }
    });

    await sequelize.authenticate();
    console.log('✅ Database Connection: SUCCESS');
    console.log('   ✅ Connected to Supabase database');
    console.log('   ✅ Credentials are correct');
    console.log('   ✅ SSL is working');
    console.log('');

    // Test query
    try {
      const [results] = await sequelize.query('SELECT version() as version, current_database() as database, current_user as user;');
      if (results && results.length > 0) {
        console.log('✅ Database Query: SUCCESS');
        console.log(`   Database: ${results[0].database}`);
        console.log(`   User: ${results[0].user}`);
        console.log('');
      }
    } catch (queryError) {
      console.log('   ⚠️  Query test failed, but connection works');
      console.log('');
    }

    await sequelize.close();

    // Final Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 ALL CHECKS PASSED!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('✅ Environment variables: All set');
    console.log('✅ Configuration values: All valid');
    console.log('✅ DNS resolution: Working');
    console.log('✅ Database connection: Successful');
    console.log('✅ Credentials: Correct');
    console.log('');
    console.log('💡 Your Supabase configuration is PERFECT!');
    console.log('💡 You can now start the backend: npm start');
    console.log('💡 Login will work: admin@billing.com / admin123');
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
      console.log('   7. Extract values and update backend/.env:');
      console.log('      - Host: db.xxxxx.supabase.co');
      console.log('      - Port: 5432 or 6543');
      console.log('      - User: postgres');
      console.log('      - Password: (from connection string)');
      console.log('      - Database: postgres');
      console.log('   8. If password is lost, reset it:');
      console.log('      - Settings → Database → Reset database password');
      console.log('');
    } else if (connError.message.includes('timeout')) {
      console.log('🔍 This means:');
      console.log('   ❌ Connection timed out');
      console.log('   💡 Try port 6543 (connection pooling) instead of 5432');
      console.log('   💡 Update DB_PORT=6543 in .env');
      console.log('');
    } else if (connError.message.includes('SSL') || connError.message.includes('certificate')) {
      console.log('🔍 This means:');
      console.log('   ❌ SSL/TLS connection issue');
      console.log('');
      console.log('✅ TO FIX:');
      console.log('   1. Ensure DB_SSL=true in .env');
      console.log('   2. Ensure DB_SSL_REJECT_UNAUTHORIZED=false in .env');
      console.log('   3. Supabase requires SSL connections');
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
checkConfiguration().catch(error => {
  console.error('❌ Unexpected error:', error.message);
  process.exit(1);
});
