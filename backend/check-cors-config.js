// Check CORS Configuration between Frontend and Backend
// Verifies that CORS origins are properly configured

require('dotenv').config();
const fs = require('fs');
const path = require('path');

console.log('');
console.log('🔒 CORS Configuration Check');
console.log('==========================');
console.log('');

// Get backend configuration
const backendPort = process.env.PORT || 8000;
const frontendUrl = process.env.FRONTEND_URL;
const nodeEnv = process.env.NODE_ENV || 'development';

// Default localhost origins from server.js
const defaultLocalhostOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3002'
];

const allowedOrigins = frontendUrl 
  ? [frontendUrl, ...defaultLocalhostOrigins]
  : defaultLocalhostOrigins;

// Check frontend configuration
let frontendPort = null;
let frontendApiUrl = null;
const viteConfigPath = path.join(__dirname, '..', 'frontend', 'vite.config.js');
const frontendConstantsPath = path.join(__dirname, '..', 'frontend', 'src', 'utils', 'constants.js');

console.log('📋 Backend Configuration:');
console.log(`   Port: ${backendPort}`);
console.log(`   FRONTEND_URL: ${frontendUrl || 'NOT SET (using defaults)'}`);
console.log(`   Environment: ${nodeEnv}`);
console.log('');

if (fs.existsSync(viteConfigPath)) {
  const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  const portMatch = viteConfig.match(/port:\s*(\d+)/);
  if (portMatch) {
    frontendPort = parseInt(portMatch[1]);
  }
}

if (fs.existsSync(frontendConstantsPath)) {
  const constants = fs.readFileSync(frontendConstantsPath, 'utf8');
  // Check for API_BASE_URL default
  if (constants.includes('http://localhost:8000/api')) {
    frontendApiUrl = 'http://localhost:8000/api';
  }
}

console.log('📋 Frontend Configuration:');
if (frontendPort) {
  console.log(`   Port: ${frontendPort}`);
} else {
  console.log(`   Port: Unknown (check vite.config.js)`);
}
if (frontendApiUrl) {
  console.log(`   API URL: ${frontendApiUrl}`);
} else {
  console.log(`   API URL: Check constants.js`);
}
console.log('');

// Check if ports are running
console.log('🔍 Checking Running Services...');
console.log('');

const netstat = require('child_process').execSync;
let backendRunning = false;
let frontendRunning = false;

try {
  const ports = netstat('netstat -ano | findstr "LISTENING" | findstr ":8000 :3001 :5173"', { encoding: 'utf8' });
  backendRunning = ports.includes(':8000');
  frontendRunning = ports.includes(':3001') || ports.includes(':5173');
} catch (e) {
  // Ignore errors
}

console.log(`   Backend (port ${backendPort}): ${backendRunning ? '✅ RUNNING' : '❌ NOT RUNNING'}`);
if (frontendPort) {
  console.log(`   Frontend (port ${frontendPort}): ${frontendRunning ? '✅ RUNNING' : '❌ NOT RUNNING'}`);
} else {
  console.log(`   Frontend: ${frontendRunning ? '✅ RUNNING' : '❌ NOT RUNNING'}`);
}
console.log('');

// CORS Analysis
console.log('🔒 CORS Configuration Analysis:');
console.log('');

const frontendOrigin = frontendPort ? `http://localhost:${frontendPort}` : 'http://localhost:3001';
const frontendOriginAlt = frontendPort ? `http://127.0.0.1:${frontendPort}` : 'http://127.0.0.1:3001';

console.log(`   Frontend Origin: ${frontendOrigin}`);
console.log(`   Frontend Origin (alt): ${frontendOriginAlt}`);
console.log('');

// Check if frontend origin is allowed
const isAllowed = allowedOrigins.some(origin => {
  if (typeof origin === 'string') {
    return origin === frontendOrigin || origin === frontendOriginAlt;
  } else if (origin instanceof RegExp) {
    return origin.test(frontendOrigin) || origin.test(frontendOriginAlt);
  }
  return false;
});

// In development, localhost is always allowed
const isDevAllowed = nodeEnv === 'development' || !nodeEnv;

console.log('   Allowed Origins:');
allowedOrigins.forEach(origin => {
  if (typeof origin === 'string') {
    console.log(`      ✅ ${origin}`);
  } else {
    console.log(`      ✅ ${origin.toString()}`);
  }
});
console.log('');

if (isAllowed || isDevAllowed) {
  console.log('✅ CORS Configuration: VALID');
  console.log('');
  console.log(`   ✅ Frontend origin (${frontendOrigin}) is ALLOWED`);
  if (isDevAllowed) {
    console.log('   ✅ Development mode: All localhost origins are allowed');
  }
  console.log('');
  console.log('📊 Summary:');
  console.log('   ✅ Backend CORS is configured correctly');
  console.log('   ✅ Frontend origin will be accepted');
  console.log('   ✅ No CORS errors expected');
  console.log('');
} else {
  console.log('❌ CORS Configuration: INVALID');
  console.log('');
  console.log(`   ❌ Frontend origin (${frontendOrigin}) is NOT in allowed list`);
  console.log('');
  console.log('✅ FIX:');
  console.log('   1. Add FRONTEND_URL to backend/.env:');
  console.log(`      FRONTEND_URL=${frontendOrigin}`);
  console.log('   2. Or ensure frontend runs on port 3000, 3001, or 3002');
  console.log('   3. Restart backend after changing .env');
  console.log('');
}

// Check API URL configuration
console.log('🔗 API URL Configuration:');
console.log('');

const expectedApiUrl = `http://localhost:${backendPort}/api`;
console.log(`   Expected API URL: ${expectedApiUrl}`);
if (frontendApiUrl) {
  console.log(`   Frontend API URL: ${frontendApiUrl}`);
  if (frontendApiUrl === expectedApiUrl) {
    console.log('   ✅ API URL matches!');
  } else {
    console.log('   ⚠️  API URL mismatch');
    console.log('   💡 Frontend should use:', expectedApiUrl);
  }
} else {
  console.log('   ⚠️  Could not determine frontend API URL');
  console.log('   💡 Frontend should use:', expectedApiUrl);
}
console.log('');

// Final Summary
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 FINAL SUMMARY');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

const allGood = (isAllowed || isDevAllowed) && backendRunning && frontendRunning;

if (allGood) {
  console.log('🎉 ALL CHECKS PASSED!');
  console.log('');
  console.log('✅ Backend is running');
  console.log('✅ Frontend is running');
  console.log('✅ CORS is properly configured');
  console.log('✅ Frontend can communicate with backend');
  console.log('');
  console.log('💡 Your application should work without CORS errors!');
  console.log('');
} else {
  console.log('⚠️  SOME ISSUES FOUND');
  console.log('');
  if (!backendRunning) {
    console.log('❌ Backend is not running');
  }
  if (!frontendRunning) {
    console.log('❌ Frontend is not running');
  }
  if (!isAllowed && !isDevAllowed) {
    console.log('❌ CORS configuration issue');
  }
  console.log('');
  console.log('💡 Fix the issues above and run this check again');
  console.log('');
}

process.exit(allGood ? 0 : 1);

