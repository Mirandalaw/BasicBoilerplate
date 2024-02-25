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
}