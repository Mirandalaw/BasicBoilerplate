const userService = require('../service/userService');
const resHandler = require('../util/resHandler');

module.exports = {
  userFindAll: async (req, res) => {
    try {
      const user = await userService.findAll();
      console.log(user);
      resHandler.getMethodSuccessResponse(res, user);
      return;
    } catch (err) {
      console.error(err);
      return res.status(500);
    }
  },
};
