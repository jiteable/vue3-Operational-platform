const Sku = require('../../models/product/sku');

// 添加 SKU
exports.addSku = async (skuData) => {
  return Sku.create(skuData);
};

// 获取指定 SPU 下的 SKU 列表
exports.getSkuList = async (spuId) => {
  return Sku.find({ spuId })
    .populate('tmId', 'tmName')
    .populate('category3Id', 'name')
    .sort({ createdAt: -1 });
};

// 更新 SKU
exports.updateSku = async (skuId, skuData) => {
  return Sku.findByIdAndUpdate(skuId, skuData, { new: true });
};

// 删除 SKU
exports.deleteSku = async (skuId) => {
  return Sku.findByIdAndDelete(skuId);
};

// 批量删除 SKU
exports.deleteSkusBySpuId = async (spuId) => {
  return Sku.deleteMany({ spuId });
}; 