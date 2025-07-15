const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  roleName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  remark: {
    type: String,
    default: null
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  },
  permissionIds: [String]
}, { collection: 'acl_roles' }); // 指定集合名

// 创建索引
roleSchema.index({ roleName: 1 });
roleSchema.index({ createTime: -1 });

const Role = mongoose.model('Role', roleSchema); // 注册名为 'Role'

module.exports = Role;