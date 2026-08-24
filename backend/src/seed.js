require('dotenv').config();
const { connectDatabase } = require('./config/db');
const Plant = require('./models/Plant');
const User = require('./models/User');
const Nursery = require('./models/Nursery');
const Order = require('./models/Order');
const bcrypt = require('bcryptjs');

const monthsAgo = (months, day = 12) => {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  d.setDate(day);
  d.setHours(12, 0, 0, 0);
  return d;
};

(async () => {
  await connectDatabase();
  const passwordHash = await bcrypt.hash('PlantUno@123', 12);

  await Order.deleteMany({});
  await Nursery.deleteMany({});
  await Plant.deleteMany({});
  await User.deleteMany({});

  const users = await User.create([
    { name: 'PlantUno Admin', email: 'admin@plantuno.com', passwordHash, role: 'admin' },
    { name: 'Green Paradise Owner', email: 'nursery@plantuno.com', passwordHash, role: 'nursery', location: { locality: 'Kothrud', city: 'Pune', district: 'Pune', state: 'Maharashtra', pincode: '411038', latitude: 18.5074, longitude: 73.8077 } },
    { name: 'Priya Sharma', email: 'customer@plantuno.com', passwordHash, role: 'customer', location: { address: 'Karve Road', locality: 'Kothrud', city: 'Pune', district: 'Pune', state: 'Maharashtra', pincode: '411038', latitude: 18.5070, longitude: 73.8060 } },
    { name: 'Rohit Mehta', email: 'rohit@plantuno.com', passwordHash, role: 'customer', location: { locality: 'Baner', city: 'Pune', district: 'Pune', state: 'Maharashtra', pincode: '411045', latitude: 18.5590, longitude: 73.7868 } },
    { name: 'Anjali Verma', email: 'anjali@plantuno.com', passwordHash, role: 'customer', location: { locality: 'Aundh', city: 'Pune', district: 'Pune', state: 'Maharashtra', pincode: '411007', latitude: 18.5594, longitude: 73.8073 } }
  ]);

  const owner = users.find(u => u.role === 'nursery');
  const nurseries = await Nursery.create([
    { owner: owner._id, name: 'Green Paradise Nursery', address: 'Paud Road', locality: 'Kothrud', city: 'Pune', district: 'Pune', state: 'Maharashtra', pincode: '411038', latitude: 18.5074, longitude: 73.8077, location: { type: 'Point', coordinates: [73.8077, 18.5074] }, rating: 4.8, phone: '9876543210', openNow: true },
    { owner: owner._id, name: 'Sai Garden Center', address: 'Bhusari Colony', locality: 'Kothrud', city: 'Pune', district: 'Pune', state: 'Maharashtra', pincode: '411038', latitude: 18.5106, longitude: 73.7995, location: { type: 'Point', coordinates: [73.7995, 18.5106] }, rating: 4.6, phone: '9876543211', openNow: true },
    { owner: owner._id, name: 'Bloom World Nursery', address: 'Karve Nagar', locality: 'Karve Nagar', city: 'Pune', district: 'Pune', state: 'Maharashtra', pincode: '411052', latitude: 18.4917, longitude: 73.8217, location: { type: 'Point', coordinates: [73.8217, 18.4917] }, rating: 4.7, phone: '9876543212', openNow: false },
    { owner: owner._id, name: 'Urban Leaf Nursery', address: 'Baner Road', locality: 'Baner', city: 'Pune', district: 'Pune', state: 'Maharashtra', pincode: '411045', latitude: 18.5590, longitude: 73.7868, location: { type: 'Point', coordinates: [73.7868, 18.5590] }, rating: 4.5, phone: '9876543213', openNow: true }
  ]);

  const image = (name) => `/assets/plants/${name}.svg`;
  const plants = await Plant.insertMany([
    { name: 'Monstera Deliciosa', category: 'Indoor Plants', price: 699, image: image('monstera'), description: 'Tropical statement plant for bright rooms.', light: 'Bright indirect', water: '2-3 times/week', difficulty: 'Easy', featured: true, nurseryId: nurseries[0]._id },
    { name: 'Snake Plant', category: 'Indoor Plants', price: 499, image: image('snake'), description: 'Hardy low-maintenance plant.', light: 'Low to bright', water: 'Every 10-14 days', difficulty: 'Very easy', featured: true, nurseryId: nurseries[1]._id },
    { name: 'Peace Lily', category: 'Flowering Plants', price: 399, image: image('peace-lily'), description: 'Elegant flowering plant.', light: 'Medium indirect', water: 'Weekly', difficulty: 'Medium', featured: true, nurseryId: nurseries[2]._id },
    { name: 'Aloe Vera', category: 'Succulents', price: 249, image: image('aloe'), description: 'Useful succulent with simple care.', light: 'Bright', water: 'Every 2 weeks', difficulty: 'Easy', featured: true, nurseryId: nurseries[0]._id },
    { name: 'Jade Plant', category: 'Succulents', price: 249, image: image('jade'), description: 'Compact evergreen favorite.', light: 'Bright', water: 'Weekly', difficulty: 'Easy', featured: true, nurseryId: nurseries[1]._id },
    { name: 'Areca Palm', category: 'Indoor Plants', price: 599, image: image('areca'), description: 'Lush palm for indoor corners.', light: 'Bright indirect', water: 'Twice weekly', difficulty: 'Medium', featured: true, nurseryId: nurseries[2]._id },
    { name: 'Tulsi', category: 'Medicinal Plants', price: 199, image: image('tulsi'), description: 'Aromatic herb for home gardens.', light: 'Bright', water: 'Daily', difficulty: 'Easy', nurseryId: nurseries[0]._id },
    { name: 'Rose', category: 'Flowering Plants', price: 299, image: image('rose'), description: 'Colorful flowering garden plant.', light: 'Full sun', water: 'Daily', difficulty: 'Medium', nurseryId: nurseries[1]._id },
    { name: 'Bonsai Ficus', category: 'Bonsai Plants', price: 899, image: image('bonsai'), description: 'Desk-friendly sculpted bonsai.', light: 'Bright', water: 'Every 3-4 days', difficulty: 'Medium', nurseryId: nurseries[2]._id },
    { name: 'Orchid', category: 'Gift Plants', price: 749, image: image('orchid'), description: 'Elegant flowering gift plant.', light: 'Bright indirect', water: 'Weekly', difficulty: 'Medium', nurseryId: nurseries[3]._id },
    { name: 'Money Plant', category: 'Office Plants', price: 299, image: image('money'), description: 'Easy-care trailing indoor plant.', light: 'Medium indirect', water: 'Weekly', difficulty: 'Easy', nurseryId: nurseries[0]._id },
    { name: 'Cactus Mix', category: 'Succulents', price: 349, image: image('cactus'), description: 'Low-water desktop succulent mix.', light: 'Bright', water: 'Every 2 weeks', difficulty: 'Easy', nurseryId: nurseries[3]._id }
    ,{ name: 'Lemon Plant', category: 'Fruit Plants', price: 549, image: image('areca'), description: 'Compact fruiting plant for sunny spaces.', light: 'Full sun', water: 'Daily', difficulty: 'Medium', nurseryId: nurseries[3]._id }
    ,{ name: 'Mint Herb', category: 'Herb Plants', price: 149, image: image('tulsi'), description: 'Fresh aromatic herb for kitchens.', light: 'Bright', water: 'Daily', difficulty: 'Easy', nurseryId: nurseries[0]._id }
    ,{ name: 'Outdoor Palm', category: 'Outdoor Plants', price: 799, image: image('areca'), description: 'Statement palm for balconies and gardens.', light: 'Bright', water: '3 times/week', difficulty: 'Easy', nurseryId: nurseries[2]._id }
  ]);

  const customers = users.filter(u => u.role === 'customer');
  const orders = [];
  for (let m = 5; m >= 0; m--) {
    for (let j = 0; j < 3; j++) {
      const customer = customers[(m + j) % customers.length];
      const p1 = plants[(m * 2 + j) % plants.length];
      const p2 = plants[(m * 2 + j + 3) % plants.length];
      const q1 = (j % 2) + 1;
      const q2 = j === 2 ? 2 : 1;
      const status = m === 0 ? ['PLACED', 'SHIPPED', 'DELIVERED'][j] : (j === 0 ? 'DELIVERED' : 'SHIPPED');
      orders.push({
        userId: customer._id,
        items: [
          { plantId: p1._id, nurseryId: p1.nurseryId, name: p1.name, price: p1.price, quantity: q1 },
          { plantId: p2._id, nurseryId: p2.nurseryId, name: p2.name, price: p2.price, quantity: q2 }
        ],
        total: p1.price * q1 + p2.price * q2,
        status,
        paymentStatus: status === 'PLACED' ? 'PENDING' : 'PAID',
        createdAt: new Date(monthsAgo(m, 8 + j * 5))
      });
    }
  }
  await Order.insertMany(orders);

  console.log(`PlantUno demo seed completed: ${users.length} users, ${nurseries.length} nurseries, ${plants.length} plants, ${orders.length} orders.`);
  process.exit(0);
})().catch(error => { console.error(error); process.exit(1); });
