const reviewRouter = require('express').Router();
const { getReviews, postReview } = require('../controllers/reviewController.js');

reviewRouter.route('/')
  .get((req, res) => {
    if (!req.query.product_id) {
      res.sendStatus(404);
    };
    getReviews(+req.query.product_id, req.query)
      .then(results => {
        res.status(200).json(results);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      })
  })
  .post((req, res) => {
    if (!req.query.product_id) {
      res.sendStatus(404);
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


module.exports = reviewRouter;