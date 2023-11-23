const mysql2 = require('mysql2');
const dbConfig = require('../../config/db_config');

const pool = mysql2.createPool(dbConfig);

exports.dbCon = function (query) {
  pool.getConnection(async (err, conn) => {
    conn.query(query);
    if (!err) {
      conn.release();
    } else {
      throw err;
    }
  });
};
