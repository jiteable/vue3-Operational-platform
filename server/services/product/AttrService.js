const Attr = require('../../models/product/attr');

exports.getAttrs = async (categoryId, categoryLevel) => {
  return Attr.find({ categoryId, categoryLevel });
};

exports.addOrUpdateAttr = async (attr) => {
  if (attr.id) {
    // 修改
    return Attr.findByIdAndUpdate(attr.id, attr, { new: true });
  } else {
    // 新增
    return Attr.create(attr);
  }
};

exports.deleteAttr = async (id) => {
  return Attr.findByIdAndDelete(id);
};