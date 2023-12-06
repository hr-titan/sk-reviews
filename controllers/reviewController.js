const review = require('../models/reviewModel.js');

const getReviews = (id, params) => {
  const sort = params.sort || 'relevant';
  const page = params.page || 1;
  const count = params.count || 5;
  const offset = (count * page) - count;

  return review.find({ product_id: id, reported: 'false' }).limit(count).skip(offset);
};

const postReview = (id, data) => {
  const { rating, summary, recommend, response, body, reviewer_name, photos, characteristics } = data;
  const review = {
    product_id: id,
    rating,
    summary,
    recommend,
    response,
    body,
    reviewer_name,
    photos
  };
  if (characteristics) {
    const characteristicsReview = {
      ...characteristics,
      product_id: id
    };
    console.log('POST characteristicsReview');
  }
  return review.create(review);
}

module.exports = { getReviews };