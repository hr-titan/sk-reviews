const reviewRouter = require('express').Router();
const checkProductId = require('../middleware/checkProductId.js');
const { getReviews, postReview,
  updateHelpfulness, reportReview,
  getMetaData, testEndPoint } = require('../controllers/reviewController.js');

const { cache } = require('../middleware/cache.js');

reviewRouter.route('/')
  .get(checkProductId, (req, res) => {
    getReviews(+req.query.product_id, req.query)
      .then(result => {
        console.log(req.url);
        cache.put(req.url, result, 5000);
        res.status(200).json(result);
      })

  })
  .post(checkProductId, (req, res) => {
    postReview(+req.query.product_id, req.body)
      .then(result => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      })
  })

reviewRouter.get('/meta', checkProductId, (req, res) => {
  getMetaData(req.query.product_id)
    .then(result => {
      console.log(req.url);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(404);
    })
})

reviewRouter.put('/:review_id/helpful', (req, res) => {
  updateHelpfulness(+req.params.review_id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(404);
    })
});

reviewRouter.put('/:review_id/report', (req, res) => {
  reportReview(+req.params.review_id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(404);
    })
})

reviewRouter.get('/:name/test', (req, res) => {
  testEndPoint(req.params.name)
    .then(result => {
      res.sendStatus(200);
    })
})

module.exports = reviewRouter;