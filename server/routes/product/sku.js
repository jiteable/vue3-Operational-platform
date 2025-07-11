const express = require('express');
const router = express.Router();
const SkuController = require('../../controllers/product/SkuController');

// 获取SKU分页列表
router.get('/admin/product/list/:page/:limit', SkuController.list);
// 上架SKU
router.get('/admin/product/onSale/:skuId', SkuController.onSale);
// 下架SKU
router.get('/admin/product/cancelSale/:skuId', SkuController.cancelSale);
// 获取SKU详情
router.get('/admin/product/getSkuInfo/:skuId', SkuController.getInfo);
// 删除SKU
router.delete('/admin/product/deleteSku/:skuId', SkuController.delete);

module.exports = router;
