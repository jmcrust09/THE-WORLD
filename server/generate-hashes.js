const bcrypt = require('bcryptjs');

async function generateHashes() {
  const adminHash = await bcrypt.hash('THEWORLDWM@adminpwd', 10);
  const user1Hash = await bcrypt.hash('password123user1', 10);
  const user2Hash = await bcrypt.hash('password123user2', 10);
  
  console.log('Admin hash:', adminHash);
  console.log('User1 hash:', user1Hash);
  console.log('User2 hash:', user2Hash);
}

generateHashes();
