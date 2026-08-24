const mongoose = require('mongoose');
const Plant = require('../models/Plant');
const Order = require('../models/Order');
const Nursery = require('../models/Nursery');

async function create(req, res) {
  try {
    const input = Array.isArray(req.body.items) ? req.body.items : [];
    if (!input.length) return res.status(400).json({ message: 'Cart is empty' });

    const clean = input.map(i => ({
      plantId: String(i.plantId),
      quantity: Math.max(1, Number(i.quantity) || 1)
    }));

    if (clean.some(i => !mongoose.Types.ObjectId.isValid(i.plantId))) {
      return res.status(400).json({ message: 'Invalid plant in cart' });
    }

    const ids = clean.map(i => new mongoose.Types.ObjectId(i.plantId));
    const plants = await Plant.find({ _id: { $in: ids } }).lean();
    const byId = new Map(plants.map(p => [String(p._id), p]));

    if (plants.length !== new Set(clean.map(i => i.plantId)).size) {
      return res.status(400).json({ message: 'One or more plants are no longer available' });
    }

    const items = clean.map(i => {
      const p = byId.get(i.plantId);
      return {
        plantId: p._id,
        nurseryId: p.nurseryId || null,
        name: p.name,
        price: p.price,
        quantity: i.quantity
      };
    });

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = await Order.create({ userId: req.user.id, items, total });
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Unable to create order', detail: error.message });
  }
}

async function mine(req, res) {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 }).lean();
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function customerStats(req, res) {
  try {
    const orders = await Order.find({ userId: req.user.id, status: { $ne: 'CANCELLED' } }).lean();
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const plantsBought = orders.reduce((sum, order) => sum + order.items.reduce((n, item) => n + item.quantity, 0), 0);
    const recentOrders = orders.slice(0, 6).map(order => ({
      id: order._id, createdAt: order.createdAt, status: order.status, total: order.total,
      items: order.items.map(item => ({ name: item.name, quantity: item.quantity }))
    }));
    res.json({ orders: orders.length, totalSpent, plantsBought, activeOrders: orders.filter(o => !['DELIVERED', 'CANCELLED'].includes(o.status)).length, recentOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function nurseryStats(req, res) {
  try {
    const nursery = await Nursery.findOne({ owner: req.user.id }).lean();
    if (!nursery) return res.status(404).json({ message: 'Nursery profile not found' });

    const orders = await Order.find({ 'items.nurseryId': nursery._id }).sort({ createdAt: -1 }).lean();
    let revenue = 0;
    let unitsSold = 0;
    let orderCount = 0;
    const recentOrders = [];
    const dayMap = new Map();

    for (const order of orders) {
      const items = order.items.filter(i => String(i.nurseryId) === String(nursery._id));
      if (!items.length) continue;
      orderCount += 1;
      const orderRevenue = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const units = items.reduce((sum, i) => sum + i.quantity, 0);
      if (order.status !== 'CANCELLED') {
        revenue += orderRevenue;
        unitsSold += units;
        const day = new Date(order.createdAt).toISOString().slice(0, 10);
        dayMap.set(day, (dayMap.get(day) || 0) + orderRevenue);
      }
      if (recentOrders.length < 6) recentOrders.push({ id: order._id, createdAt: order.createdAt, status: order.status, total: orderRevenue, items: items.map(i => ({ name: i.name, quantity: i.quantity })) });
    }

    const revenueByDay = Array.from(dayMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-8)
      .map(([date, value]) => ({ date, value }));

    const inventory = await Plant.countDocuments({ nurseryId: nursery._id });
    res.json({ revenue, orders: orderCount, unitsSold, inventory, rating: nursery.rating || 0, revenueByDay, recentOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function adminStats(req, res) {
  try {
    const [orders, customers, nurseries, plants] = await Promise.all([
      Order.find({ status: { $ne: 'CANCELLED' } }).sort({ createdAt: -1 }).lean(),
      mongoose.model('User').countDocuments({ role: 'customer' }),
      Nursery.countDocuments(),
      Plant.countDocuments()
    ]);

    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    const unitsSold = orders.reduce((sum, order) => sum + order.items.reduce((n, item) => n + item.quantity, 0), 0);

    const monthMap = new Map();
    for (const order of orders) {
      const d = new Date(order.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleString('en-IN', { month: 'short' });
      const current = monthMap.get(key) || { month: label, value: 0 };
      current.value += order.total;
      monthMap.set(key, current);
    }
    const revenueByMonth = Array.from(monthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([, value]) => value);

    const statusMap = new Map();
    for (const order of orders) statusMap.set(order.status, (statusMap.get(order.status) || 0) + 1);
    const orderStatus = Array.from(statusMap.entries()).map(([status, value]) => ({ status, value }));

    const recentOrders = orders.slice(0, 8).map(order => ({
      id: order._id,
      createdAt: order.createdAt,
      status: order.status,
      total: order.total,
      items: order.items.length,
      units: order.items.reduce((n, i) => n + i.quantity, 0)
    }));

    res.json({ revenue, orders: orders.length, customers, nurseries, plants, unitsSold, revenueByMonth, orderStatus, recentOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { create, mine, customerStats, nurseryStats, adminStats };
