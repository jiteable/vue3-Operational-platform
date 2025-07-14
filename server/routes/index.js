var express = require('express');
var router = express.Router();

// 引入各个模块的路由
const userRouter = require('./acl/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 注册路由
router.use('/', userRouter);


module.exports = router;
