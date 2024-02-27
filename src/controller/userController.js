const userService = require('../service/userService');
const authService = require("../service/authService");

const resHandler = require('../util/resHandler');

module.exports = {
  userFindAll: async (req, res) => {
    try {
      const user = await userService.findAll();
      resHandler.SuccessResponse(res, user, 200);
    } catch (err) {
      console.error(err);
      resHandler.FailedResponse(res, err.stack, 500);
    }
  },

  userSignUp : async (req,res) =>{
    try{
      const user = await authService.signUp(req.body);
      resHandler.SuccessResponse(res,"회원가입 완료했습니다.",201);
    }catch (err){
      console.error(err);
      resHandler.FailedResponse(res,err.stack, 500);
    }
  }
};
