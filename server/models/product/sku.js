const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkuAttrValueSchema = new Schema({
  attrId: { type: Schema.Types.ObjectId, ref: 'Attr' },
  valueId: { type: Schema.Types.ObjectId, ref: 'AttrValue' }
}, { _id: false });

const SkuSaleAttrValueSchema = new Schema({
  saleAttrId: { type: Schema.Types.ObjectId, ref: 'BaseSaleAttr' },
  saleAttrValueId: { type: Schema.Types.ObjectId, ref: 'SaleAttrValue' }
}, { _id: false });

const SkuType = {
  skuName: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number, required: true },
  skuDesc: { type: String },
  skuDefaultImg: { type: String, required: true },
  category3Id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  spuId: { type: Schema.Types.ObjectId, ref: 'Spu', required: true },
  tmId: { type: Schema.Types.ObjectId, ref: 'Trademark', required: true },
  skuAttrValueList: [SkuAttrValueSchema],
  skuSaleAttrValueList: [SkuSaleAttrValueSchema],
  isSale: { type: Number, default: 0 }
};

const SkuModel = mongoose.model('sku', new Schema(SkuType, { timestamps: true }));

module.exports = SkuModel; 