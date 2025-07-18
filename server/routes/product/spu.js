const express = require('express');
const router = express.Router();
const SpuController = require('../../controllers/product/SpuController');


// 获取 SKU 列表 - GET /admin/product/findBySpuId/:spuId
router.get('/findBySpuId/:spuId', SpuController.getSkuList);

// 获取所有品牌 - GET /admin/product/baseTrademark/getTrademarkList
router.get('/baseTrademark/getTrademarkList', SpuController.getAllTrademarks);


// 获取 SPU 列表 - GET /admin/product/:page/:limit?category3Id=xxx
router.get('/:page/:limit', SpuController.getSpuList);

// 获取 SPU 图片列表 - GET /admin/product/spuImageList/:spuId
router.get('/spuImageList/:spuId', SpuController.getSpuImages);

// 获取 SPU 销售属性 - GET /admin/product/spuSaleAttrList/:spuId
router.get('/spuSaleAttrList/:spuId', SpuController.getSpuSaleAttrs);

// 获取所有销售属性 - GET /admin/product/baseSaleAttrList
router.get('/baseSaleAttrList', SpuController.getAllSaleAttrs);

// 添加 SPU - POST /admin/product/saveSpuInfo
router.post('/saveSpuInfo', SpuController.addOrUpdateSpu);

// 更新 SPU - POST /admin/product/updateSpuInfo
router.post('/updateSpuInfo', SpuController.addOrUpdateSpu);

// 添加 SKU - POST /admin/product/saveSkuInfo
router.post('/saveSkuInfo', SpuController.addSku);


// 删除 SPU - DELETE /admin/product/deleteSpu/:spuId
router.delete('/deleteSpu/:spuId', SpuController.deleteSpu);

module.exports = router;
