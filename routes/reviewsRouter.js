const reviewRouter = require('express').Router();
const { getReviews, postReview,
  updateHelpfulness, reportReview,
  getMetaData, testEndPoint } = require('../controllers/reviewController.js');

reviewRouter.route('/')
  .get((req, res) => {
    if (!req.query.product_id) {
      return res.sendStatus(400);
    };
    console.log(req.query.product_id);
    getReviews(+req.query.product_id, req.query)
      .then(result => {
        res.status(200).json(result);
      })

  })
  .post((req, res) => {
    if (!req.query.product_id) {
      return res.sendStatus(400);
    };
    postReview(+req.query.product_id, req.body)
      .then(result => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      })
  })

reviewRouter.get('/meta', (req, res) => {
  if (!req.query.product_id) {
    return res.sendStatus(400);
  }
  getMetaData(req.query.product_id)
    .then(result => {
      console.log(result);
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