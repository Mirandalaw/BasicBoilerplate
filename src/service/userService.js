const db = require('../loader/db');
const logger = require('../loader/logger');

module.exports = {
  findAll: async () => {
    let connection;
    try {
      connection = await db.getConnection();
      let query = 'SELECT * FROM user';
      const results = await executeQuery(connection, query);
      console.log('Query Results : ', results);
      logger.info('test Complete');
      return results;
    } catch (error) {
      logger.error('Error', error.stack);
      console.error('Error:', error.message);
      return error;
    } finally {
      if (connection) {
        await db.releaseConnection(connection);
      }
    }
  },
};

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
