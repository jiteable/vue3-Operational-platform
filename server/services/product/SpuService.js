const Spu = require('../../models/product/spu');
const Sku = require('../../models/product/sku');
const Trademark = require('../../models/product/TrademarkModel');
const { BaseSaleAttr } = require('../../models/product/saleAttr');
const { Category3 } = require('../../models/product/CategoryModel');
const mongoose = require('mongoose');

const SpuService = {
  // 获取指定分类下的 SPU 列表
  async getSpuList(page, limit, category3Id) {
    const skip = (page - 1) * limit;
    const query = category3Id ? { category3Id } : {};

    const [spus, total] = await Promise.all([
      Spu.find(query)
        .populate('tmId', 'tmName logoUrl')
        .populate('category3Id', 'name')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Spu.countDocuments(query)
    ]);

    return {
      records: spus,
      total,
      size: limit,
      current: page,
      pages: Math.ceil(total / limit)
    };
  },

  // 获取所有品牌
  async getAllTrademarks() {
    const result = await Trademark.find().sort({ createdAt: -1 })
    return result;
  },

  // 获取 SPU 图片列表
  async getSpuImages(spuId) {
    const spu = await Spu.findById(spuId);
    return spu ? spu.spuImageList : [];
  },

  // 获取 SPU 销售属性
  async getSpuSaleAttrs(spuId) {
    const spu = await Spu.findById(spuId).populate('spuSaleAttrList.baseSaleAttrId');
    return spu ? spu.spuSaleAttrList : [];
  },

  // 获取所有销售属性
  async getAllSaleAttrs() {
    return BaseSaleAttr.find().sort({ createdAt: -1 });
  },

  // 添加或更新 SPU
  async addOrUpdateSpu(spuData) {
    // 清理和验证数据
    const cleanData = { ...spuData };

    // 处理 tmId - 如果为空字符串，设为 null
    if (cleanData.tmId === '') {
      cleanData.tmId = null;
    }

    // 处理 category3Id - 如果为空字符串，设为 null
    if (cleanData.category3Id === '') {
      cleanData.category3Id = null;
    }

    // 清理销售属性数据
    if (cleanData.spuSaleAttrList && Array.isArray(cleanData.spuSaleAttrList)) {
      cleanData.spuSaleAttrList = cleanData.spuSaleAttrList.filter(attr => {
        // 过滤掉 baseSaleAttrId 为 undefined 或空字符串的属性
        if (!attr.baseSaleAttrId || attr.baseSaleAttrId === 'undefined' || attr.baseSaleAttrId === '') {
          return false;
        }

        // 清理销售属性值列表
        if (attr.spuSaleAttrValueList && Array.isArray(attr.spuSaleAttrValueList)) {
          attr.spuSaleAttrValueList = attr.spuSaleAttrValueList.filter(value => {
            return value.baseSaleAttrId && value.baseSaleAttrId !== 'undefined' && value.baseSaleAttrId !== '';
          });
        }

        return true;
      });
    }

    // 清理图片数据
    if (cleanData.spuImageList && Array.isArray(cleanData.spuImageList)) {
      cleanData.spuImageList = cleanData.spuImageList.filter(img => {
        return img.imgName && img.imgUrl;
      });
    }

    if (spuData.id) {
      // 更新
      return Spu.findByIdAndUpdate(spuData.id, cleanData, { new: true });
    } else {
      // 新增
      return Spu.create(cleanData);
    }
  },

  // 删除 SPU
  async deleteSpu(spuId) {
    // 同时删除相关的 SKU
    await Sku.deleteMany({ spuId });
    return Spu.findByIdAndDelete(spuId);
  },

  // 获取 SPU 下的 SKU 列表
  async getSkuList(spuId) {
    const realSpuId = mongoose.Types.ObjectId.isValid(spuId) ? new mongoose.Types.ObjectId(spuId) : spuId;
    const result = await Sku.find({ spuId: realSpuId });
    console.log(result, 'wwwwwwwwwwwwwwwwwwww')
    return result;
  }
};

module.exports = SpuService; 