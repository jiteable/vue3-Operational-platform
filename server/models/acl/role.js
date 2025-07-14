const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
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
  }
}, {
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

// 创建索引
roleSchema.index({ roleName: 1 });
roleSchema.index({ createTime: -1 });

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;