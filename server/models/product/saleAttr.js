const mongoose = require('mongoose');

// 基础销售属性 Schema
const BaseSaleAttrSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { timestamps: true });

// 销售属性值 Schema
const SaleAttrValueSchema = new mongoose.Schema({
  valueName: { type: String, required: true },
  baseSaleAttrId: { type: mongoose.Schema.Types.ObjectId, ref: 'BaseSaleAttr' }
}, { timestamps: true });

module.exports = {
  BaseSaleAttr: mongoose.model('BaseSaleAttr', BaseSaleAttrSchema),
  SaleAttrValue: mongoose.model('SaleAttrValue', SaleAttrValueSchema)
}; 