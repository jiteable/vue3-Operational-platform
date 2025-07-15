const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: { type: String, required: true },         // 菜单名称
  code: { type: String, required: true },         // 权限标识
  pid: { type: Schema.Types.ObjectId, ref: 'Menu', default: null }, // 父级菜单ID
  type: { type: Number },         // 0:目录 1:菜单 2:按钮
  status: { type: Number, default: 1 },           // 状态 1:正常 0:禁用
  select: { type: Boolean, default: false },      // 是否选中
  children: { type: Array, default: [] },         // 子菜单
  level: { type: Number, default: 0 },                     // 菜单层级
  toCode: { type: String },                                // 按钮权限标识
  createTime: { type: Date, default: Date.now },            // 创建时间
  updateTime: { type: Date, default: Date.now },            // 更新时间
});

module.exports = mongoose.model('Menu', menuSchema, 'menus');