require('dotenv').config();
const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)
      .then(() => console.log('Connection to DB successful'));
  } catch(err) {
    console.log('Error: DB connection unsuccessful', err);
  }
};

module.exports = connection;