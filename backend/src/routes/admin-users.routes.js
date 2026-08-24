const express = require('express');
const bcrypt = require('bcryptjs');
const { requireSuperAdmin } = require('../security/superAdmin.middleware');

const router = express.Router();

let User;
for (const p of ['../models/User','../models/user','../model/User','../model/user']) {
  try { User = require(p); break; } catch (_) {}
}
if (!User) throw new Error('User model not found for admin management routes.');

router.get('/', requireSuperAdmin, async (req, res) => {
  const admins = await User.find({ role: 'admin' })
    .select('-passwordHash -password')
    .sort({ createdAt: -1 });
  res.json(admins);
});

router.post('/', requireSuperAdmin, async (req, res) => {
  const { name, email, mobile, password, isSuperAdmin = false } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email and password are required.' });
  }
  const exists = await User.findOne({ email: String(email).toLowerCase() });
  if (exists) return res.status(409).json({ message: 'An account with this email already exists.' });

  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await User.create({
    name,
    email: String(email).toLowerCase(),
    mobile,
    passwordHash,
    role: 'admin',
    isSuperAdmin: Boolean(isSuperAdmin),
    isActive: true
  });
  res.status(201).json({
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    isSuperAdmin: admin.isSuperAdmin
  });
});

router.patch('/:id/status', requireSuperAdmin, async (req, res) => {
  const admin = await User.findOne({ _id: req.params.id, role: 'admin' });
  if (!admin) return res.status(404).json({ message: 'Admin not found.' });
  if (String(admin._id) === String(req.user.id || req.user.userId || req.user._id)) {
    return res.status(400).json({ message: 'The owner cannot disable their own account.' });
  }
  admin.isActive = Boolean(req.body.isActive);
  await admin.save();
  res.json({ message: 'Admin status updated.', isActive: admin.isActive });
});

router.patch('/:id/reset-password', requireSuperAdmin, async (req, res) => {
  const admin = await User.findOne({ _id: req.params.id, role: 'admin' });
  if (!admin) return res.status(404).json({ message: 'Admin not found.' });
  if (!req.body.password) return res.status(400).json({ message: 'Password is required.' });
  admin.passwordHash = await bcrypt.hash(req.body.password, 12);
  await admin.save();
  res.json({ message: 'Admin password reset successfully.' });
});

module.exports = router;
