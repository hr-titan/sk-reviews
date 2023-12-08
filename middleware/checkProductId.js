const checkProductId = (req, res, next) => {
  if (!req.query.product_id) {
    return res.sendStatus(400);
  }
  next();
}

module.exports = checkProductId;