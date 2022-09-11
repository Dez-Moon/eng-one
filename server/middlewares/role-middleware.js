const ApiError = require("../exceptions/api-error");
const jwt = require("jsonwebtoken");
const tokenService = require("../service/token-service");

module.exports = function (role) {
  return async function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.autorization.split(" ")[1];
      if (!token) {
        return next(ApiError.UnathorizedError());
      }
      const { role: userRole } = await tokenService.validateAccessToken(token);
      if (userRole !== role && typeof role === "string") {
        return next(ApiError.BadRequest("Нет доступа"));
      }
      if (typeof role !== "string") {
        let congruence = false;
        role.forEach((role) => {
          if (role === userRole) {
            congruence = true;
          }
        });
        if (!congruence) {
          return next(ApiError.BadRequest("Нет доступа"));
        }
      }
      next();
    } catch (e) {
      return next(ApiError.UnathorizedError());
    }
  };
};
