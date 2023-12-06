const reviewRouter = require('express').Router();
const { getReviews } = require('../controllers/reviewController.js');

reviewRouter.param('/:product_id', (req, res, next) => {
  console.log(req.params);
  next();
})

reviewRouter.route('/')
  .get((req, res) => {
    if (!req.query.product_id) {
      res.sendStatus(404);
    }
    getReviews(req.query.product_id, req.query)
      .then(results => {
        console.log(results[0]['recommend']);
        res.status(200).send(results);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      })
  })


module.exports = reviewRouter;