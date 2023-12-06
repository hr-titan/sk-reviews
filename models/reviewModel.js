const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  rating: { type: Number, required: true },
  summary: { type: String, maxLength: 60, required: true },
  recommend: { type: Boolean, required: true },
  response: { type: String, default: null },
  body: { type: String, required: true, minLength: 50, maxLength: 1000 },
  date: { type: Date, default: Date.now },
  reviewer_name: { type: String, required: true },
  helpfulness: { type: Number, default: 0 },
  photos: { type: [String], default: [] },
});

const Reviews =  new mongoose.model('Reviews', reviewSchema, 'reviews');

module.exports = Reviews;