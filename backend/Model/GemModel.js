const mongoose = require('mongoose');

const GemSchema = new mongoose.Schema({
  GID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  color: { type: String },
  price: { type: Number, required: true },
  weight: { type: String },
  category: { type: String },
  quantity: { type: Number, required: true },
  status: { type: String, required: true },
  image: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Gem', GemSchema);
