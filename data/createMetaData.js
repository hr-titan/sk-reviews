require('dotenv').config();
const mongoose = require('mongoose');

const initiateMetaAggregation = async () => {
  try {
    console.log('Start time: ', new Date().toISOString())
    await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
    const db = mongoose.connection;
    const reviewCollection = db.collection('reviews');
    const result = await reviewCollection.aggregate([
      {
        $lookup: {
          from: 'characteristic-reviews',
          localField: 'review_id',
          foreignField: 'review_id',
          as: 'characteristics'
        }
      },
      {
        $unwind: '$characteristics'
      },
      {
        $group: {
          _id: '$product_id',
          true: { $sum: { $cond: { if: { $eq: ['$recommend', true]}, then: 1, else: 0}}},
          false: { $sum: { $cond: { if: { $eq: ['$recommend', false]}, then: 1, else: 0}}},
          rating1: { $sum: { $cond: { if: { $eq: ['$rating', 1]}, then: 1, else: 0}}},
          rating2: { $sum: { $cond: { if: { $eq: ['$rating', 2]}, then: 1, else: 0}}},
          rating3: { $sum: { $cond: { if: { $eq: ['$rating', 3]}, then: 1, else: 0}}},
          rating4: { $sum: { $cond: { if: { $eq: ['$rating', 4]}, then: 1, else: 0}}},
          rating5: { $sum: { $cond: { if: { $eq: ['$rating', 5]}, then: 1, else: 0}}},
          fit: { $avg: '$characteristics.Fit'},
          quality: { $avg: '$characteristics.Quality'},
          comfort: { $avg: '$characteristics.Comfort'},
          length: { $avg: '$characteristics.Length'},
          size: { $avg: '$characteristics.Size'},
          width: { $avg: '$characteristics.Width'}
        },
      },
      {
        $project: {
          _id: 0,
          product_id: '$_id',
          rating: {
            1: '$rating1',
            2: '$rating2',
            3: '$rating3',
            4: '$rating4',
            5: '$rating5',
          },
          recommend: {
            true: '$true',
            false: '$false'
          },
          characteristics: {
            Fit: '$fit',
            Quality: '$quality',
            Comfort: '$comfort',
            Length: '$length',
            Size: '$size',
            Width: '$width'
          }
        },
      },
      {
        $merge: {
          into: 'product-meta-data',
          on: 'product_id',
          whenMatched: 'replace',
          whenNotMatched: 'insert',
        },
      },
    ]).toArray();

    console.log('Meta data successfully created:', result);
    console.log('End time: ', new Date().toISOString())
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.connection.close();
  }
};

// initiateMetaAggregation();
//950072
//mongodb://localhost:27017