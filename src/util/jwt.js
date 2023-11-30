const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const { options, secretKey } = require('../../config/jwt/jwtConfig');

module.exports = {
  // 토큰 생성
  createToken: async (uuid) => {
    const payload = {
      uuid: uuid,
    };
    const result = jwt.sign(payload, secretKey, options);
    return result;
  },
};
