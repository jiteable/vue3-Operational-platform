const mongoose = require('mongoose');

const AttrValueSchema = new mongoose.Schema({
  valueName: { type: String, required: true }
}, { _id: false });

const AttrSchema = new mongoose.Schema({
  attrName: { type: String, required: true },
  attrValueList: { type: [AttrValueSchema], default: [] },
  categoryId: { type: mongoose.Schema.Types.Mixed, required: true },
  categoryLevel: { type: Number, required: true }
});

module.exports = mongoose.model('Attr', AttrSchema);