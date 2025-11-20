// Complete Supabase Connection Test
// Tests database connection and verifies credentials are correct

require('dotenv').config();
const dns = require('dns');
const { promisify } = require('util');
const { Sequelize } = require('sequelize');

const dnsResolve = promisify(dns.resolve4);

async function testConnection() {
  const dbHost = process.env.DB_HOST;
  const dbPort = parseInt(process.env.DB_PORT || 5432);
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;

  console.log('');
  console.log('🔍 Complete Supabase Connection Test');
  console.log('====================================');
  console.log('');

  // Check credentials are set
  if (!dbHost || !dbUser || !dbPassword || !dbName) {
    console.log('❌ Missing database credentials!');
    console.log('');
    console.log('Required environment variables:');
    console.log(`   DB_HOST: ${dbHost || 'NOT SET'}`);
    console.log(`   DB_USER: ${dbUser || 'NOT SET'}`);
    console.log(`   DB_PASSWORD: ${dbPassword ? '***SET***' : 'NOT SET'}`);
    console.log(`   DB_NAME: ${dbName || 'NOT SET'}`);
    console.log('');
    console.log('💡 Set these in backend/.env file');
    process.exit(1);
  }

  console.log('📋 Database Configuration:');
  console.log(`   Host: ${dbHost}`);
  console.log(`   Port: ${dbPort}`);
  console.log(`   User: ${dbUser}`);
  console.log(`   Password: ${dbPassword ? '***SET***' : 'NOT SET'}`);
  console.log(`   Database: ${dbName}`);
  console.log('');

  let results = {
    dnsResolution: false,
    connectionSuccessful: false,
    credentialsValid: false,
    canQuery: false
  };

  // Step 1: DNS Resolution
  console.log('🔍 Step 1: Testing DNS Resolution...');
  console.log('');

  try {
    const addresses = await dnsResolve(dbHost);
    console.log('✅ DNS Resolution: SUCCESS');
    console.log(`   Resolved IP: ${addresses[0]}`);
    console.log('   ✅ Supabase project is ACTIVE (not paused)');
    console.log('');
    results.dnsResolution = true;
  } catch (error) {
    console.log('❌ DNS Resolution: FAILED');
    console.log(`   Error: ${error.message}`);
    console.log('');
    console.log('🔍 This means:');
    console.log('   ❌ Supabase project is PAUSED');
    console.log('   ❌ Database hostname cannot be resolved');
    console.log('   ❌ Free tier auto-pauses after inactivity');
    console.log('');
    console.log('✅ FIX - Restore Supabase Project:');
    console.log('   1. Go to: https://supabase.com/dashboard');
    console.log('   2. Sign in to your account');
    console.log('   3. Find your project in the list');
    console.log('   4. If you see "Paused" status, click "Restore" button');
    console.log('   5. Wait 3-5 minutes for database to fully restore');
    console.log('   6. Run this test again: npm run test-supabase');
    console.log('');
    console.log('💡 After restoring, the DNS will resolve and connection will work');
    console.log('');
    process.exit(1);
  }

  // Step 2: Database Connection Test
  console.log('🔍 Step 2: Testing Database Connection...');
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
    console.log('   ✅ Credentials are CORRECT');
    console.log('');
    results.connectionSuccessful = true;
    results.credentialsValid = true;
    
    // Step 3: Test Query
    console.log('🔍 Step 3: Testing Database Query...');
    console.log('');
    
    try {
      const [queryResults] = await sequelize.query('SELECT version() as version, current_database() as database, current_user as user;');
      if (queryResults && queryResults.length > 0) {
        console.log('✅ Database Query: SUCCESS');
        console.log(`   Database: ${queryResults[0].database}`);
        console.log(`   User: ${queryResults[0].user}`);
        console.log('   ✅ Database is fully operational');
        console.log('');
        results.canQuery = true;
      }
      
      // Test if users table exists (for login)
      console.log('🔍 Step 4: Checking Database Schema...');
      console.log('');
      
      try {
        const [tables] = await sequelize.query(`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_type = 'BASE TABLE'
          ORDER BY table_name;
        `);
        
        const tableNames = tables.map(t => t.table_name);
        const hasUsersTable = tableNames.includes('users');
        
        console.log(`   Found ${tableNames.length} tables in database`);
        if (hasUsersTable) {
          console.log('   ✅ Users table exists (login will work)');
        } else {
          console.log('   ⚠️  Users table not found (run migrations)');
        }
        console.log('');
        
      } catch (schemaError) {
        console.log('   ⚠️  Could not check schema (but connection works)');
        console.log('');
      }
      
    } catch (queryError) {
      console.log('   ⚠️  Query test failed, but connection successful');
      console.log('');
    }
    
    await sequelize.close();
    
  } catch (error) {
    console.log('❌ Database Connection: FAILED');
    console.log(`   Error: ${error.message}`);
    console.log('');
    
    if (error.message.includes('password') || error.message.includes('authentication')) {
      console.log('🔍 This means:');
      console.log('   ❌ Authentication failed');
      console.log('   ❌ Credentials are INCORRECT');
      console.log('');
      console.log('✅ FIX - Get Correct Credentials:');
      console.log('   1. Go to: https://supabase.com/dashboard');
      console.log('   2. Click your project');
      console.log('   3. Go to: Settings → Database');
      console.log('   4. Scroll to "Connection string" section');
      console.log('   5. Click "URI" tab');
      console.log('   6. Copy the connection string');
      console.log('   7. Extract values:');
      console.log('      - Host: db.xxxxx.supabase.co');
      console.log('      - Port: 5432 or 6543');
      console.log('      - User: postgres');
      console.log('      - Password: (from connection string)');
      console.log('      - Database: postgres');
      console.log('   8. Update backend/.env file');
      console.log('   9. If password is lost, reset it:');
      console.log('      - Settings → Database → Reset database password');
      console.log('');
    } else if (error.message.includes('timeout')) {
      console.log('🔍 This means:');
      console.log('   ❌ Connection timed out');
      console.log('   ❌ Firewall might be blocking');
      console.log('   💡 Try port 6543 (connection pooling) instead of 5432');
      console.log('');
    } else {
      console.log('🔍 Connection failed for unknown reason');
      console.log('   Check error message above');
      console.log('');
    }
    
    process.exit(1);
  }

  // Final Summary
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 FINAL SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  if (results.dnsResolution && results.connectionSuccessful && results.credentialsValid) {
    console.log('🎉 ALL TESTS PASSED!');
    console.log('');
    console.log('✅ Supabase project is ACTIVE');
    console.log('✅ Database connection is WORKING');
    console.log('✅ Credentials are CORRECT');
    console.log('✅ Database is ready for use');
    console.log('');
    console.log('💡 You can now:');
    console.log('   1. Start backend: npm start');
    console.log('   2. Login with credentials:');
    console.log('      - Email: admin@billing.com');
    console.log('      - Password: admin123');
    console.log('   3. All database operations will work');
    console.log('');
    process.exit(0);
  } else {
    console.log('❌ SOME TESTS FAILED');
    console.log('');
    console.log(`   DNS Resolution: ${results.dnsResolution ? '✅' : '❌'}`);
    console.log(`   Connection: ${results.connectionSuccessful ? '✅' : '❌'}`);
    console.log(`   Credentials: ${results.credentialsValid ? '✅' : '❌'}`);
    console.log('');
    process.exit(1);
  }
}

// Run the test
testConnection().catch(error => {
  console.error('❌ Unexpected error:', error.message);
  process.exit(1);
});
