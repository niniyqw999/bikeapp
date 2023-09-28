var express = require('express');
var userRouter = express.Router();
const userController = require('../controller/userController');

//登录
userRouter.post('/region/user',userController.login);
//获取用户信息
userRouter.get('/region/getusers',userController.get);
//删除用户
userRouter.delete('/region/deluser/:phone',userController.del);

module.exports = userRouter;