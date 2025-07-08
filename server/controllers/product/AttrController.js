const AttrService = require('../../services/product/AttrService');

exports.getAttrs = async (req, res) => {
  const { c1Id, c2Id, c3Id } = req.params;
  // 只支持三级分类
  const categoryId = c3Id;
  const categoryLevel = 3;
  const attrs = await AttrService.getAttrs(categoryId, categoryLevel);
  res.json({ code: 200, data: attrs });
};

exports.addOrUpdateAttr = async (req, res) => {
  const attr = req.body;
  const result = await AttrService.addOrUpdateAttr(attr);
  res.json({ code: 200, data: result });
};

exports.deleteAttr = async (req, res) => {
  const { attrId } = req.params;
  await AttrService.deleteAttr(attrId);
  res.json({ code: 200 });
};