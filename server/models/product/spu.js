const mongoose = require('mongoose');

// SPU 图片 Schema
const SpuImgSchema = new mongoose.Schema({
  imgName: { type: String, required: true },
  imgUrl: { type: String, required: true },
  spuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Spu' }
}, { timestamps: true });

// 销售属性值 Schema
const SaleAttrValueSchema = new mongoose.Schema({
  saleAttrValueName: { type: String, required: true },
  baseSaleAttrId: { type: mongoose.Schema.Types.ObjectId, ref: 'BaseSaleAttr' },
  spuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Spu' }
}, { timestamps: true });

// 销售属性 Schema
const SaleAttrSchema = new mongoose.Schema({
  saleAttrName: { type: String, required: true },
  baseSaleAttrId: { type: mongoose.Schema.Types.ObjectId, ref: 'BaseSaleAttr' },
  spuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Spu' },
  spuSaleAttrValueList: [SaleAttrValueSchema]
}, { timestamps: true });

// SPU Schema
const SpuSchema = new mongoose.Schema({
  spuName: { type: String, required: true },
  description: { type: String },
  category3Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category3' },
  tmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trademark' },
  spuImageList: [SpuImgSchema],
  spuSaleAttrList: [SaleAttrSchema]
}, { timestamps: true });

module.exports = mongoose.model('Spu', SpuSchema); 