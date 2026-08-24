const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  plantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant', required: true },
  nurseryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Nursery', default: null, index: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  items: { type: [OrderItemSchema], required: true },
  total: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'], default: 'PLACED', index: true },
  paymentStatus: { type: String, enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'], default: 'PENDING', index: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
