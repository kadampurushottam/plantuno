require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL);

  // Try common User model locations.
  let User;
  const candidates = [
    '../src/models/User',
    '../src/models/user',
    '../src/model/User',
    '../src/model/user',
    '../src/User',
    '../src/user'
  ];
  for (const p of candidates) {
    try { User = require(p); break; } catch (_) {}
  }
  if (!User) throw new Error('User model not found. Update scripts/create-admin.js to match your model path.');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = q => new Promise(resolve => rl.question(q, resolve));

  const name = (await ask('Owner name: ')).trim();
  const email = (await ask('Owner email: ')).trim().toLowerCase();
  const mobile = (await ask('Owner mobile: ')).trim();
  const password = await ask('Owner password: ');
  rl.close();

  if (!name || !email || !password) throw new Error('Name, email and password are required.');

  const passwordHash = await bcrypt.hash(password, 12);
  const query = User.findOne({ $or: [{ email }, ...(mobile ? [{ mobile }] : [])] });
  const existing = await query;

  if (existing) {
    existing.name = name;
    existing.email = email;
    if (mobile) existing.mobile = mobile;
    existing.passwordHash = passwordHash;
    existing.role = 'admin';
    existing.isSuperAdmin = true;
    existing.isActive = true;
    await existing.save();
    console.log(`Updated existing account as PlantUno Owner: ${email}`);
  } else {
    await User.create({
      name,
      email,
      mobile: mobile || undefined,
      passwordHash,
      role: 'admin',
      isSuperAdmin: true,
      isActive: true
    });
    console.log(`Created PlantUno Owner: ${email}`);
  }
  await mongoose.disconnect();
}
main().catch(async err => {
  console.error(err.message);
  try { await mongoose.disconnect(); } catch (_) {}
  process.exit(1);
});
