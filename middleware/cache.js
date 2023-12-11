const memCache = require('memory-cache');
const cache = new memCache.Cache();

const checkCache = (req, res, next) => {
  const cachedResult = cache.get(req.url);
  if (cachedResult) {
    return res.status(200).json(cachedResult);
  }
  next();
}

module.exports = { checkCache, cache };