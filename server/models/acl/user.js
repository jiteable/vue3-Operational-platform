const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserType = {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: '' },
  phone: { type: String, default: null },
  roleName: { type: String, default: '' },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now }
};

const UserModel = mongoose.model('acl_user', new Schema(UserType));

module.exports = UserModel; 