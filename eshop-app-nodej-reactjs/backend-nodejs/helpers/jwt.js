const JWT = require("jsonwebtoken");
const Boom = require("boom");

const redis = require("../clients/redis");

function signAccessToken(data) {
  return new Promise((resolve, reject) => {
    const payload = {
      ...data,
    };

    const options = {
      expiresIn: "10d",
      issuer: "ecommerce.app",
    };

    JWT.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
      if (err) {
        console.log(err);
        reject(Boom.internal());
      }

      resolve(token);
    });
  });
}

function verifyAccessToken(req, res, next) {
  const authorizationToken = req.headers["authorization"];

  if (!authorizationToken) {
    return next(Boom.unauthorized());
  }

  JWT.verify(authorizationToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return next(
        Boom.unauthorized(
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message
        )
      );
    }

    req.payload = payload;
    next();
  });
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
};
