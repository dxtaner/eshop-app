const rateLimiter = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const redisClient = require("./clients/redis");
const Boom = require("boom");

const customLimiterOptions = {
  // store: new RedisStore({
  //   client: redisClient,
  //   resetExpiryOnChange: true,
  //   expiry: 30,
  // }),
  max: 1000,
  handler: (request, response, next) => {
    next(Boom.tooManyRequests());
  },
};

const customRateLimiter = rateLimiter(customLimiterOptions);

module.exports = customRateLimiter;
