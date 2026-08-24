const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  category: { type: String, default: 'Indoor', index: true },
  price: { type: Number, default: 0, min: 0 },
  image: String,
  description: String,
  light: String,
  water: String,
  difficulty: String,
  featured: { type: Boolean, default: false },
  nurseryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Nursery', default: null, index: true }
}, { timestamps: true });

module.exports = mongoose.model('Plant', PlantSchema);
