const db = require('../loader/db');
const logger = require('../loader/logger');

module.exports = {
  findAll: async () => {
    let connection;
    try {
      // DBCP 적용 커넥션 가져오기
      connection = await db.getConnection();

      // ****************************

      // DAO or Model로 구분 하기

      let query = 'SELECT * FROM users';

      const result = await executeQuery(connection, query);

      // ****************************
      console.log('Query Results : ', result);

      logger.info('test Complete');

      return result;
    } catch (err) {
      logger.error('Error', err.stack);
      console.error('Error:', err.message);
      return err;
    } finally {
      if (connection) {
        // DBCP 적용 커넥션 풀 반납
        await db.releaseConnection(connection);
      }
    }
  },

  insert: async (data) => {
    let connection;
    try {
      connection = await db.getConnection();
      // data is "client's request"
      let query = 'INSERT INTO users VALUES(테스트,01011112222) ;';

      const result = await executeQuery(connection, query);

      console.log('Query Results : ', result);

      return result;
    } catch (err) {
      logger.error('Error', err.stack);
      console.error('Error', err.stack);
    } finally {
      if (connection) {
        // DBCP 적용 커넥션 풀 반납
        await db.releaseConnection(conncetion);
      }
    }
  },
};

// ****************************

// DAO or Model로 구분 하기

function executeQuery(connection, query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function executeQuery(connection, query) {
  try {
    const [results] = await connection.query(query);
    return results;
  } catch (error) {
    throw error;
  }
}

// ****************************
