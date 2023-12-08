const mongoose = require('mongoose');

const metaDataSchema = new mongoose.Schema({
  product_id: { type: Number, index: true, required: true },
  rating: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
  },
  recommend: {
    true: { type: Number },
    false: { type: Number },
  },
  characteristics: {
    Fit: Number,
    Quality: Number,
    Comfort: Number,
    Length: Number,
    Size: Number,
    Width: Number
  }
});

const MetaData = new mongoose.model('product-meta-data', metaDataSchema, 'product-meta-data');

module.exports = MetaData;