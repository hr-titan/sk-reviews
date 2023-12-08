const mongoose = require('mongoose');

const characteristicSchema = new mongoose.Schema({
  review_id: { type: Number, index: true },
  product_id: { type: Number, required: true, index: true },
  quality: { type: Number, min: 1, max: 5 },
  length: { type: Number, min: 1, max: 5 },
  width: { type: Number, min: 1, max: 5 },
  comfort: { type: Number, min: 1, max: 5 },
  fit: { type: Number, min: 1, max: 5 },
  size: { type: Number, min: 1, max: 5 },
});

const Characteristics = new mongoose.model('characteristic-review', characteristicSchema, 'characteristic-reviews');

module.exports = Characteristics;