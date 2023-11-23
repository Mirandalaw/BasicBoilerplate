const userService = require('../service/userService');

module.exports = {
  userFindAll: async (req, res) => {
    try {
      const user = await userService.findAll();
      console.log(user);
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500);
    }
  },
};
