const SkuModel = require('../../models/product/sku');

const SkuService = {
  getList: async ({ page = 1, limit = 10 }) => {
    const skip = (page - 1) * limit;
    const total = await SkuModel.countDocuments();
    const records = await SkuModel.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    return { records, total, size: limit, current: page, pages: Math.ceil(total / limit) };
  },
  onSale: async (skuId) => {
    return SkuModel.findByIdAndUpdate(skuId, { isSale: 1 });
  },
  cancelSale: async (skuId) => {
    return SkuModel.findByIdAndUpdate(skuId, { isSale: 0 });
  },
  getInfo: async (skuId) => {
    return SkuModel.findById(skuId);
  },
  delete: async (skuId) => {
    return SkuModel.findByIdAndDelete(skuId);
  },
};

module.exports = SkuService; 