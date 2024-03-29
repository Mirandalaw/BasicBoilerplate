const { verifyPassword, createHashedPassword, createSalt } = require('../util/crypto');
const jwt = require('../util/jwt');
const uuid = require('../util/uuid');
const logger = require('../util/logger');
// const redis = require("../util/redis");
const {
  TOKEN_INVALID,
  TOKEN_EXPIRED,
  ACCESSTOKEN_INVALID,
  REFRESHTOKEN_INVALID,
  ACCESSTOKEN_EXPIRED,
  REFRESHTOKEN_EXPIRED,
} = require('../config/jwt/tokenStatusConfig');

const userModel = require('../model/user');

module.exports = {


  signUp: async (data) => {
    try {
      // 1. 유저 uuid 생성
      // 2. salt 생성
      // 3. salt를 통해 암호화 진행
      
      const user_uuid = uuid.createUUID();

      const salt = await createSalt();
      const hashedPassword = await createHashedPassword(data.password, salt);

      const user = await userModel.insertUserInfo(user_uuid, hashedPassword, salt, data);

      // 영향을 미친 행이 없다면 null 리턴
      if(!user.affectedRows) {
        return null;
      }

      // 예외처리 추가
      return user.affectedRows;

    } catch (err) {
      console.error(err);
      logger.error('Sign Up failed : ', err);
      return err;
    }
  },

  // login: async (data) => {
  //   try {
  //     const user = await userModel.findByEmail(data.email);
  //     // auth_login_status 여부 판단
  //     if (user) {
  //       const { user_uuid, salt, password } = user;
  //
  //       const verified = await verifyPassword(data.password, salt, password);
  //       if (verified) {
  //         const accessToken = jwt.createAccessToken(user_uuid);
  //         const refreshToken = jwt.createRefreshToken();
  //         console.log("refreshToken : ", refreshToken);
  //         await redis.set(user_uuid, refreshToken);
  //         await redis.expire(user_uuid, 10 * 60 * 60 * 24);
  //         return accessToken;
  //       } else return null;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("Login failed");
  //   }
  // },

  // autoLogin: async (data) => {
  //   try {
  //     const accessToken = data.headers.authorization.split("Bearer ")[1];
  //     if (!accessToken) return null;
  //     const accessTokenInfo = jwt.verify(accessToken);
  //
  //     if (accessTokenInfo === TOKEN_EXPIRED) return;
  //   } catch (err) {}
  // },

  // verifyToken: async (reqData) => {
  //   try {
  //     const accessToken = reqData.headers.authorization.split("Bearer ")[1];
  //
  //     if (!accessToken) return { accessToken: null, result: false };
  //
  //     const accTokenInfo = jwt.verify(accessToken); // => invalid, expired, {payload}
  //
  //     // accessToken이 invalid된 경우 (accessToken 이 변조된 경우)
  //     if (accTokenInfo === TOKEN_INVALID)
  //       return { accessToken: null, result: ACCESSTOKEN_INVALID };
  //     // accessToken이 expired된 경우 (accessToken이 만료된 경우)
  //     else if (accTokenInfo === TOKEN_EXPIRED) {
  //       // refreshToken 의 유효성 검사
  //
  //       const { uuid } = accTokenInfo;
  //       console.log("uuid", uuid);
  //       const refreshToken = await redis.get(uuid);
  //       console.log("refreshToken", refreshToken);
  //       const refTokenInfo = jwt.refreshVerify(refreshToken, uuid);
  //       if (refTokenInfo === TOKEN_INVALID)
  //         return { accessToken: null, result: REFRESHTOKEN_INVALID };
  //       if (refTokenInfo === TOKEN_EXPIRED)
  //         return { accessToken: null, result: REFRESHTOKEN_EXPIRED };
  //       else if (refTokenInfo) {
  //         let new_accessToken = jwt.createAccessToken(uuid);
  //         return { accessToken: new_accessToken, result: ACCESSTOKEN_EXPIRED }; //refreshToken 이 있으니 access 재발급 해서 result 값주고
  //       }
  //     } else {
  //       return { accessToken: accessToken, result: true };
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     logger.error("Token Error : ", err.stack);
  //     return { accessToken: null, result: false };
  //   }
  // },
};
