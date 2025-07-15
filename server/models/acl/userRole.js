const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRoleType = {
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  createTime: { type: Date, default: Date.now }
};

const UserRoleModel = mongoose.model('acl_user_role', new Schema(UserRoleType, { timestamps: true }));

module.exports = UserRoleModel; 