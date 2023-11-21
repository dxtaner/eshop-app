const { roles } = require("../rules/roles.js");
const Boom = require("boom");

function grantAccess(action, resource) {
  return async (req, res, next) => {
    const permission = roles.can(req.payload.role)[action](resource);

    if (!permission.granted) {
      return next(Boom.unauthorized("You don't have permission."));
    }

    next();
  };
}

module.exports = grantAccess;
