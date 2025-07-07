var express = require('express');
var TrademarkRouter = express.Router();
const TrademarkController = require('../../controllers/product/TrademarkController')

//图片上传
const multer = require('multer')
const path = require('path')

// 配置multer存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avataruploads/')
  },
  filename: function (req, file, cb) {
    // 保留原始文件扩展名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 4 * 1024 * 1024 // 限制4MB
  },
  fileFilter: function (req, file, cb) {
    // 只允许上传图片
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('只允许上传图片文件'), false)
    }
  }
})

// 品牌管理相关路由
TrademarkRouter.get("/admin/product/baseTrademark/:page/:limit", TrademarkController.getTrademark) // 获取品牌列表
TrademarkRouter.post("/admin/product/baseTrademark/save", TrademarkController.addTrademark) // 添加品牌
TrademarkRouter.put("/admin/product/baseTrademark/update", TrademarkController.updateTrademark) // 修改品牌
TrademarkRouter.delete("/admin/product/baseTrademark/remove/:id", TrademarkController.delTrademark) // 删除品牌

// 文件上传路由
TrademarkRouter.post("/admin/product/fileUpload", upload.single('file'), TrademarkController.fileUpload)

TrademarkRouter.get('/test', (req, res) => {
  console.log('trademarkRouter /test 被调用');
  res.send('ok');
});

module.exports = TrademarkRouter;