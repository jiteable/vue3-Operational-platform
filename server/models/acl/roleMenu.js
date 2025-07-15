const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleMenuSchema = new Schema({
  roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  menuId: { type: Schema.Types.ObjectId, ref: 'Menu', required: true }
});

module.exports = mongoose.model('RoleMenu', roleMenuSchema);