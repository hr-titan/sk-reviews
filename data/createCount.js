require('dotenv').config();
const mongoose = require('mongoose');

const initiateCountAggregation = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
    const db = mongoose.connection;
    const reviewCollection = db.collection('reviews');
    const result = await reviewCollection.aggregate([
      {
        $count: 'count'
      },
      {
        $project: {
          _id: 'count',
          review_count: '$count'
        }
      },
      {
        $merge: {
          into: 'review-count',
          whenMatched: 'replace',
          whenNotMatched: 'insert'
        }
      }
    ]).toArray();

    console.log('Count successfully created:', result);
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close();
  }
};

// initiateCountAggregation();