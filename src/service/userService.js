const db = require('../loader/db');

module.exports = {
  findAll: async () => {
    let connection;
    try {
      connection = await db.getConnection();
      const query = 'SELECT * FROM user';
      const results = await executeQuery(connection, query);
      return results;
    } catch (err) {
      console.error('Error :', err.stack);
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
  } catch (err) {```
    throw err;
  }
}
