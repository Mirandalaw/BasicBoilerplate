const db = require("../loader/db");
const logger = require("../util/logger");

module.exports = {
  // 모든 유저 검색
  getAllUser: async () => {
    let connection;
    try {
      const query = `SELECT * FROM user`;
      connection = await db.getConnection();

      const users = await connection.query(query);

      return users[0];
    } catch (err) {
      logger.error("model Error : ", err.stack);

      return err;
    } finally {
      const releasePromise = connection ? db.releaseConnection(connection) : null;
      if (releasePromise) {
        releasePromise.then(() => {
          console.log('Connection released sucssessfully');
        }).catch((error) => {
          console.error("Error releasing connection: ", error);
        })
      }
    }
  },

  // 회원가입
  insertUserInfo : async (user_uuid, hashedPassword, salt,info) =>{
    let connection;
    try {
      const query = `INSERT INTO user (user_uuid, user_name, user_id, password, salt, phone_number) VALUES("${user_uuid}","${info.user_name}","${info.user_id}","${hashedPassword}","${salt}","${info.phone_number}")`;

      connection = await db.getConnection();

      const user = await connection.query(query);

      console.log(user);

      return user[0];
    } catch (err) {
      logger.error("model insertUserInfo Error : ", err.stack);
      return err;
    } finally {
      const releasePromise = connection ? db.releaseConnection(connection) : null;
      if (releasePromise) {
        releasePromise.then(() => {
          console.log('Connection released sucssessfully');
        }).catch((error) => {
          console.error("Error releasing connection: ", error);
        })
      }
    }
  }
}