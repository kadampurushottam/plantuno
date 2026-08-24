const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  address: { type: String, default: '', trim: true },
  locality: { type: String, default: '', trim: true },
  city: { type: String, default: '', trim: true },
  district: { type: String, default: '', trim: true },
  state: { type: String, default: '', trim: true },
  pincode: { type: String, default: '', trim: true },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['customer', 'nursery', 'admin'], default: 'customer' },
  location: { type: locationSchema, default: () => ({}) },
  isSuperAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
