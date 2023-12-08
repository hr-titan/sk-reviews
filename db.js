require('dotenv').config();
const mongoose = require('mongoose');
const updateMetaData = require('./data/createMetaData.js');

mongoose.connect('mongodb://127.0.0.1:27017/atelier-rating-reviews')
  .then(() => {
    console.log('Connection to DB successful: ', mongoose.connection.name)
    // updateMetaData(mongoose.connection);
  })
  .catch(err => console.log('Error: DB connection unsuccessful: ', err));

  module.exports = mongoose.connection;