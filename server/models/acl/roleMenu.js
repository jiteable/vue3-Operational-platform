const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleMenuSchema = new Schema({
  roleId: { type: String, ref: 'Role', required: true },
  menuId: { type: String, ref: 'Menu', required: true }
});

module.exports = mongoose.model('RoleMenu', roleMenuSchema);