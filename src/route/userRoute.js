const { Router } = require('express');
const userController = require('../controller/userController');
const userRouter = Router();

userRouter.get('/', userController.userFindAll);

module.exports = { userRouter };
