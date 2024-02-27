const { Router } = require('express');

const userController = require('../controller/userController');

const userRouter = Router();

userRouter.get('/', userController.userFindAll);
userRouter.post('/sign-up',userController.userSignUp);

userRouter.get('/test', (req, res) => {
  res.send('test');
});

module.exports = userRouter;
