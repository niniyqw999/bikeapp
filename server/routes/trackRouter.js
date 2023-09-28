var express = require('express');
var trackRouter = express.Router();
const trackController = require('../controller/trackController');

//保存轨迹数据
trackRouter.post('/region/savetracks',trackController.add);
//获取轨迹数据
trackRouter.get('/region/gettracks',trackController.get);
//删除轨迹
trackRouter.delete('/region/deltracks/:id',trackController.del);

module.exports = trackRouter;