/**
 * Generate bcrypt hash for password
 * Run: node supabase/generate-password-hash.js
 */

const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = process.argv[2] || 'admin123';
  const hash = await bcrypt.hash(password, 10);
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔐 Password Hash Generator');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`Password: ${password}`);
  console.log(`Hash: ${hash}\n`);
  console.log('Copy this hash to your seed.sql file\n');
}

generateHash().catch(console.error);

