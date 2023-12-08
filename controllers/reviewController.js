const Reviews = require('../models/reviewModel.js');
const Characteristics = require('../models/characteristicModel.js');
const MetaData = require('../models/metaDataModel.js');
const getNewIndex = require('./getNewIndex.js');

const createCharacteristicReview = (id, index, characteristics) => {
  const newReview = {
    ...characteristics,
    review_id: index,
    product_id: id
  };
  Characteristics.create(newReview)
    .then(() => {
      console.log('Characteristic review created');
      return true;
    })
}

const getReviews = (id, params) => {
  const sort = params.sort || 'relevant';
  const page = params.page || 1;
  const count = params.count || 5;
  const offset = (count * page) - count;

  return Reviews.find({ product_id: id }).limit(count).skip(offset);
};

const getMetaData = (id) => {
  return MetaData.find({ product_id: id });
}

const postReview = async (id, data) => {
  const index = await getNewIndex();
  const { rating, summary, recommend, response, body, name, photos, characteristics } = data;
  const review = {
    review_id: index,
    product_id: id,
    reviewer_name: name,
    rating,
    summary,
    recommend,
    response,
    body,
    photos
  };
  if (characteristics) {
    createCharacteristicReview(id, index, characteristics);
  }

  return Reviews.create(review);
}

const updateHelpfulness = (id) => {
  return Reviews.findOneAndUpdate({ review_id: id }, { $inc: { helpfulness: 1 }});
}

const reportReview = (id) => {
  return Reviews.findOneAndUpdate({ review_id: id }, { reported: true });
}

const testEndPoint = (name) => {
  return Reviews.find({ reviewer_name: name }).limit(5).skip(0);
}

module.exports = { getReviews, postReview, updateHelpfulness, reportReview, getMetaData, testEndPoint };