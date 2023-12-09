const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review_id: { type: Number, index: true, unique: true },
  product_id: { type: Number, required: true, index: true },
  rating: { type: Number, required: true },
  summary: { type: String, maxLength: 60, required: true },
  recommend: { type: Boolean, required: true },
  response: { type: String, default: null },
  body: { type: String, required: true, minLength: 50, maxLength: 1000 },
  date: { type: Number, default: () => Date.now() },
  reviewer_name: { type: String, required: true },
  helpfulness: { type: Number, default: 0 },
  photos: { type: [String], default: [] },
});

const Reviews = new mongoose.model('review', reviewSchema, 'reviews');

module.exports = Reviews;