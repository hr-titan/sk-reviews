require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/atelier-rating-reviews')
  .then(() => console.log('Connection to DB successful: ', mongoose.connection.name))
  .catch(err => console.log('Error: DB connection unsuccessful', err));

  module.exports = mongoose.connection;