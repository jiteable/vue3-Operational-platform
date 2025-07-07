const mongoose = require('mongoose');

// 定义品牌模型的Schema
const trademarkSchema = new mongoose.Schema({
  tmName: {
    type: String,
    required: true,
    trim: true
  },
  logoUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
  collection: 'trademarks' // 指定集合名称
});

// 创建并导出模型
const TrademarkModel = mongoose.model('Trademark', trademarkSchema);

module.exports = TrademarkModel; 