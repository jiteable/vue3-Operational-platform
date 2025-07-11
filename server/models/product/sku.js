const mongoose = require('mongoose');

// SKU 属性值 Schema
const SkuAttrValueSchema = new mongoose.Schema({
  attrId: { type: mongoose.Schema.Types.ObjectId, ref: 'Attr' },
  valueId: { type: mongoose.Schema.Types.ObjectId, ref: 'AttrValue' }
}, { _id: false });

// SKU 销售属性值 Schema
const SkuSaleAttrValueSchema = new mongoose.Schema({
  saleAttrId: { type: mongoose.Schema.Types.ObjectId, ref: 'BaseSaleAttr' },
  saleAttrValueId: { type: mongoose.Schema.Types.ObjectId, ref: 'SaleAttrValue' }
}, { _id: false });

// SKU Schema
const SkuSchema = new mongoose.Schema({
  skuName: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number, required: true },
  skuDesc: { type: String },
  skuDefaultImg: { type: String, required: true },
  category3Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  spuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Spu', required: true },
  tmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trademark', required: true },
  skuAttrValueList: [SkuAttrValueSchema],
  skuSaleAttrValueList: [SkuSaleAttrValueSchema],
  isSale: { type: Number, default: 0 } // 0: 下架, 1: 上架
}, { timestamps: true });

module.exports = mongoose.model('Sku', SkuSchema); 