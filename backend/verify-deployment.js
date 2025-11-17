/**
 * Deployment Verification Script
 * Run this to verify all environment variables are set correctly
 * Usage: node verify-deployment.js
 */

require('dotenv').config();

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔍 Deployment Verification');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const requiredVars = {
  'NODE_ENV': process.env.NODE_ENV,
  'PORT': process.env.PORT,
  'DB_DIALECT': process.env.DB_DIALECT,
  'DB_HOST': process.env.DB_HOST,
  'DB_PORT': process.env.DB_PORT,
  'DB_USER': process.env.DB_USER,
  'DB_PASSWORD': process.env.DB_PASSWORD ? '***SET***' : undefined,
  'DB_NAME': process.env.DB_NAME,
  'DB_SSL': process.env.DB_SSL,
  'JWT_SECRET': process.env.JWT_SECRET ? '***SET***' : undefined,
  'JWT_EXPIRE': process.env.JWT_EXPIRE,
  'FRONTEND_URL': process.env.FRONTEND_URL
};

const optionalVars = {
  'EMAIL_HOST': process.env.EMAIL_HOST,
  'EMAIL_PORT': process.env.EMAIL_PORT,
  'EMAIL_USER': process.env.EMAIL_USER,
  'STRIPE_SECRET_KEY': process.env.STRIPE_SECRET_KEY ? '***SET***' : undefined
};

let allValid = true;
const missing = [];
const warnings = [];

console.log('📋 Required Variables:\n');
for (const [key, value] of Object.entries(requiredVars)) {
  if (value === undefined || value === '') {
    console.log(`   ❌ ${key}: NOT SET`);
    missing.push(key);
    allValid = false;
  } else {
    console.log(`   ✅ ${key}: ${value}`);
  }
}

console.log('\n📋 Optional Variables:\n');
for (const [key, value] of Object.entries(optionalVars)) {
  if (value === undefined || value === '') {
    console.log(`   ⚠️  ${key}: NOT SET (optional)`);
    warnings.push(key);
  } else {
    console.log(`   ✅ ${key}: ${value}`);
  }
}

// Validate specific values
console.log('\n🔍 Validation:\n');

if (process.env.DB_DIALECT === 'postgres') {
  console.log('   ✅ Using PostgreSQL (Supabase)');
  
  if (!process.env.DB_SSL || process.env.DB_SSL !== 'true') {
    console.log('   ⚠️  DB_SSL should be "true" for Supabase');
    warnings.push('DB_SSL');
  }
  
  if (process.env.DB_NAME !== 'postgres') {
    console.log('   ⚠️  DB_NAME should be "postgres" for Supabase');
    warnings.push('DB_NAME');
  }
} else if (process.env.DB_DIALECT === 'mysql') {
  console.log('   ✅ Using MySQL');
} else {
  console.log('   ⚠️  DB_DIALECT not set, defaulting to mysql');
  warnings.push('DB_DIALECT');
}

if (process.env.JWT_SECRET) {
  if (process.env.JWT_SECRET.length < 32) {
    console.log('   ⚠️  JWT_SECRET should be at least 32 characters');
    warnings.push('JWT_SECRET');
  } else {
    console.log('   ✅ JWT_SECRET length is valid');
  }
}

if (process.env.DB_HOST && process.env.DB_HOST.includes('localhost')) {
  console.log('   ⚠️  DB_HOST is localhost - not accessible from Vercel');
  warnings.push('DB_HOST');
}

if (process.env.DB_PORT && process.env.DB_DIALECT === 'postgres') {
  const port = parseInt(process.env.DB_PORT);
  if (port === 6543) {
    console.log('   ✅ Using connection pooling port (6543)');
  } else if (port === 5432) {
    console.log('   ℹ️  Using standard port (5432) - consider 6543 for pooling');
  }
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

if (allValid) {
  console.log('✅ All required variables are set!');
  console.log('\n📝 Next Steps:');
  console.log('   1. Verify database connection');
  console.log('   2. Test deployment on Vercel');
  console.log('   3. Check /api/health endpoint');
  
  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(w => console.log(`   - ${w}`));
  }
  
  console.log('\n🚀 Ready for deployment!\n');
  process.exit(0);
} else {
  console.log('❌ Missing required variables:');
  missing.forEach(v => console.log(`   - ${v}`));
  console.log('\n💡 Set these in:');
  console.log('   - Local: backend/.env file');
  console.log('   - Vercel: Settings → Environment Variables');
  console.log('\n📚 See: ENV_SETUP_GUIDE.md for instructions\n');
  process.exit(1);
}

