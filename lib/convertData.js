const formatCharacteristics = (id, index, characteristics) => ({
  ...characteristics,
  review_id: index,
  product_id: id
});

const formatReview = (id, index, data) => ({
  review_id: index,
  product_id: id,
  reviewer_name: data.name,
  rating: data.rating,
  summary: data.summary,
  recommend: data.recommend,
  response: data.response,
  body: data.body,
  photos: data.photos
});

module.exports = { formatCharacteristics, formatReview };