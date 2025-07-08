const mongoose = require('mongoose');

// 一级分类模型
const category1Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// 二级分类模型
const category2Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category1Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category1',
    required: true
  }
}, {
  timestamps: true
});

// 三级分类模型
const category3Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category2Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category2',
    required: true
  }
}, {
  timestamps: true
});

const Category1 = mongoose.model('Category1', category1Schema);
const Category2 = mongoose.model('Category2', category2Schema);
const Category3 = mongoose.model('Category3', category3Schema);

module.exports = {
  Category1,
  Category2,
  Category3
}; 