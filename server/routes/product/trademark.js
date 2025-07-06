var express = require('express');
var TrademarkRouter = express.Router();
const TrademarkController = require('../controllers/TrademarkController')

//图片上传
const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })
// 
// 


TrademarkRouter.post("/admin/product/baseTrademark/save", TrademarkController.addTrademark) // 后端的 app.post 方法用于处理前端发送的 POST 请求，并获取传递的数据

TrademarkRouter.get("/admin/product/baseTrademark/:page/:limit", TrademarkController.getTrademark) // 获取用户信息

TrademarkRouter.post("/admin/product/baseTrademark/update", TrademarkController.updateTrademark)

TrademarkRouter.delete("/admin/product/baseTrademark/remove/:id", TrademarkController.delTrademark)


module.exports = TrademarkRouter;