const MenuModel = require('../../models/acl/menu');

// 递归组装树结构
function buildTree(list, pid = null, level = 1) {
  return list
    .filter(item => String(item.pid) === String(pid))
    .map(item => {
      const children = buildTree(list, item._id, level + 1);
      return {
        id: item._id,
        name: item.name,
        code: item.code,
        level,
        pid: item.pid,
        updateTime: item.updateTime,
        children: children.length ? children : undefined
      };
    });
}

class PermissionService {
  // 获取所有菜单（树形结构）
  static async getAllPermissionTree() {
    const list = await MenuModel.find().sort({ sort: 1, _id: 1 });
    return buildTree(list);
  }

  // 新增菜单
  static async createPermission(data) {
    return await MenuModel.create(data);
  }

  // 更新菜单
  static async updatePermission(id, data) {
    const mongoose = require('mongoose');
    console.log('updatePermission 参数:', id, data);
    console.log('typeof id:', typeof id);
    console.log('isValidObjectId:', mongoose.Types.ObjectId.isValid(id));
    const exist = await MenuModel.findById(id);
    console.log('findById 查找结果:', exist);
    const { name, code } = data;
    const result = await MenuModel.findByIdAndUpdate(id, { name, code, updateTime: Date.now() }, { new: true });
    console.log('findByIdAndUpdate 结果:', result);
    return result;
  }

  // 删除菜单
  static async removePermission(id) {
    // 先判断是否有子节点
    const hasChildren = await MenuModel.exists({ pid: id });
    if (hasChildren) {
      return { success: false, message: '请先删除子菜单' };
    }
    await MenuModel.findByIdAndDelete(id);
    return { success: true };
  }
}

module.exports = PermissionService;