const Reviews = require('../models/reviewModel.js');
const Characteristics = require('../models/characteristicModel.js');
const MetaData = require('../models/metaDataModel.js');
const getNewIndex = require('./getNewIndex.js');
const { formatReview, formatCharacteristics } = require('../lib/convertData.js');

const getReviews = (id, params) => {
  const sort = params.sort || 'relevant';
  const page = params.page || 1;
  const count = params.count || 5;
  const offset = (count * page) - count;

  return Reviews.find({ product_id: id }).limit(count).skip(offset);
};

const getMetaData = (id) => {
  return MetaData.findOne({ product_id: id });
}

const postReview = async (id, data) => {
  const index = await getNewIndex();
  const review = formatReview(id, index, data);

  if (data.characteristics) {
    const characteristicReview = formatCharacteristics(id, index, data.characteristics);
    return Promise.all([Characteristics.create(characteristicReview), Reviews.create(review)]);
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