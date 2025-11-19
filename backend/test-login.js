// Test Login Credentials
// This script tests login after Supabase is restored

require('dotenv').config();
const axios = require('axios');

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000/api';

console.log('');
console.log('🔐 Testing Login Credentials');
console.log('============================');
console.log('');

const testCredentials = [
  {
    email: 'admin@billing.com',
    password: 'admin123',
    role: 'Super Admin',
    expectedRole: 'super_admin'
  },
  {
    email: 'ispadmin@billing.com',
    password: 'admin123',
    role: 'ISP Admin',
    expectedRole: 'admin'
  },
  {
    email: 'accountmanager@billing.com',
    password: 'admin123',
    role: 'Account Manager',
    expectedRole: 'account_manager'
  },
  {
    email: 'technical@billing.com',
    password: 'admin123',
    role: 'Technical Officer',
    expectedRole: 'technical_officer'
  },
  {
    email: 'recovery@billing.com',
    password: 'admin123',
    role: 'Recovery Officer',
    expectedRole: 'recovery_officer'
  },
  {
    email: 'customer@billing.com',
    password: 'admin123',
    role: 'Customer',
    expectedRole: 'customer'
  }
];

async function testLogin(credentials) {
  try {
    console.log(`🔍 Testing: ${credentials.role} (${credentials.email})`);
    
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      {
        email: credentials.email,
        password: credentials.password
      },
      {
        timeout: 10000,
        validateStatus: (status) => status < 500 // Don't throw on 4xx
      }
    );

    if (response.status === 200) {
      const { token, user } = response.data;
      
      if (token && user) {
        console.log(`  ✅ Login SUCCESS!`);
        console.log(`  📋 User ID: ${user.id}`);
        console.log(`  📋 Email: ${user.email}`);
        console.log(`  📋 Role: ${user.role}`);
        console.log(`  📋 Token: ${token.substring(0, 20)}...`);
        
        if (user.role === credentials.expectedRole) {
          console.log(`  ✅ Role matches expected: ${credentials.expectedRole}`);
        } else {
          console.log(`  ⚠️  Role mismatch! Expected: ${credentials.expectedRole}, Got: ${user.role}`);
        }
        return true;
      } else {
        console.log(`  ❌ Invalid response format`);
        return false;
      }
    } else if (response.status === 401) {
      console.log(`  ❌ Login FAILED: Invalid credentials`);
      console.log(`  📋 Response: ${JSON.stringify(response.data)}`);
      return false;
    } else if (response.status === 503) {
      console.log(`  ❌ Login FAILED: Database unavailable (503)`);
      console.log(`  💡 Supabase project is paused - restore it first!`);
      return false;
    } else {
      console.log(`  ❌ Login FAILED: Status ${response.status}`);
      console.log(`  📋 Response: ${JSON.stringify(response.data)}`);
      return false;
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      console.log(`  ❌ Connection FAILED: Backend server not running`);
      console.log(`  💡 Start backend: cd backend && npm start`);
    } else if (error.response) {
      console.log(`  ❌ Error: ${error.response.status} - ${error.response.statusText}`);
      console.log(`  📋 Response: ${JSON.stringify(error.response.data)}`);
    } else {
      console.log(`  ❌ Error: ${error.message}`);
    }
    return false;
  }
}

async function runTests() {
  console.log('📋 Testing all login credentials...');
  console.log('');
  
  // First check if backend is running
  try {
    await axios.get(`${API_BASE_URL.replace('/api', '')}/api/health`, { timeout: 5000 });
    console.log('✅ Backend server is running');
    console.log('');
  } catch (error) {
    console.log('❌ Backend server is not running!');
    console.log('💡 Start backend: cd backend && npm start');
    console.log('');
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;

  for (const cred of testCredentials) {
    const success = await testLogin(cred);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    console.log('');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Test Results:');
  console.log(`   ✅ Successful: ${successCount}/${testCredentials.length}`);
  console.log(`   ❌ Failed: ${failCount}/${testCredentials.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  if (failCount > 0 && failCount === testCredentials.length) {
    console.log('💡 All logins failed - likely causes:');
    console.log('   1. ❌ Supabase project is paused (most common)');
    console.log('   2. ❌ Database connection failed');
    console.log('   3. ❌ Users not created in database');
    console.log('');
    console.log('✅ FIX:');
    console.log('   1. Restore Supabase project');
    console.log('   2. Wait 3-5 minutes');
    console.log('   3. Restart backend: npm start');
    console.log('   4. Run this test again: node test-login.js');
    console.log('');
  } else if (successCount === testCredentials.length) {
    console.log('🎉 All login credentials are working!');
    console.log('');
  }
}

// Run tests
runTests().catch(console.error);

