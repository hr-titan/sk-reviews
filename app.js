require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const dbConnection = require('./db.js');
const reviewRouter = require('./routes/reviewsRouter.js');

const app = express();
const PORT = process.env.PORT || 3000;
const db = dbConnection();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/reviews', reviewRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});