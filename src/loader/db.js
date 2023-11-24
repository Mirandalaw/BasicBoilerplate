const mysql2 = require('mysql2');
const genericPool = require('generic-pool');

const { dbConfig } = require('../../config/db_config');

const pool = genericPool.createPool({
  // 커넥션 만들기
  create: function () {
    return new Promise((resolve, reject) => {
      const connection = mysql2.createConnection(dbConfig);
      connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(connection);
        }
      });
    });
    // async function() {
    //     try {
    //         const connection = await mysql2.createConnection(dbConfig);
    //         return connection;
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
  },
  // 커넥션 닫기
  destroy: function (connection) {
    return new Promise((resolve, reject) => [
      connection.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }),
    ]);
  },
});

module.exports = {
  getConnection: () => {
    return pool.acquire();
  },
  releaseConnection: (connection) => {
    return pool.release(connection);
  },
};
