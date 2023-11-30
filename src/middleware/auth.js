const { secretKey } = require('../../config/jwt/jwtConfig');
const jwt = require('../util/jwt');
//const redis = require('');

module.exports = {
  checkToken: async (req, res, next) => {
    try {
      // 검증 로직
      return next();
    } catch (err) {
      logger.error('token is not found !', err.stack);
      console.error('token is not found !');
      next(err);
    }
  },
};
