const mongoose = require('mongoose');

const db = mongoose.connection;

const getNewIndex = async () => {
  const reviewCount = db.collection('review-count');
  const nextIndex = await reviewCount.findOneAndUpdate({ _id: 'count' }, { $inc: { review_count: 1 } }, { returnDocument: 'after' });
  return nextIndex.review_count;
}

module.exports = getNewIndex;