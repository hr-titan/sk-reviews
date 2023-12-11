require('dotenv').config();
require('./db.js');
const express = require('express');
const morgan = require('morgan');
const reviewRouter = require('./routes/reviewsRouter.js');
const { checkCache } =require('./middleware/cache.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/reviews', checkCache);

app.use('/api/reviews', reviewRouter);

app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});