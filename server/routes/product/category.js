var express = require('express');
var CategoryRouter = express.Router();
const CategoryController = require('../../controllers/product/CategoryController');

// 获取分类相关路由
CategoryRouter.get('/getCategory1', CategoryController.getCategory1);
CategoryRouter.get('/getCategory2/:category1Id', CategoryController.getCategory2);
CategoryRouter.get('/getCategory3/:category2Id', CategoryController.getCategory3);

// 添加分类相关路由
CategoryRouter.post('/addCategory1', CategoryController.addCategory1);
CategoryRouter.post('/addCategory2', CategoryController.addCategory2);
CategoryRouter.post('/addCategory3', CategoryController.addCategory3);

module.exports = CategoryRouter; 