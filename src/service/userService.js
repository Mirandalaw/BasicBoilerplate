const uuid = require("../util/uuid");
const logger = require("../util/logger");

const userModel = require("../model/user");


module.exports = {
  findAll: async () => {
    try {
      const users = await userModel.getAllUser();
      return users;
    } catch (err) {
      console.error(err);
      logger.error("Error : ", err.stack);
    }
  },
}