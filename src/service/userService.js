const dbCon = require('../loader/db');

module.exports = {
  findAll: async () => {
    try {
      let query = 'SELECT * FROM user';
      const user = await connect(query);
      console.log(user);
      return user;
    } catch (err) {
      console.error(err);
    }
  },
};
