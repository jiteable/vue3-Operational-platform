const MenuModel = require('../../models/acl/menu');
const RoleMenuModel = require('../../models/acl/roleMenu');

class MenuService {
  // 获取所有菜单
  static async getAllMenus() {
    return await MenuModel.find().sort({ sort: 1 });
  }

  // 获取角色已分配的菜单ID
  static async getRoleMenuIds(roleId) {
    const list = await RoleMenuModel.find({ roleId });
    return list.map(item => item.menuId.toString());
  }

  // 给角色分配菜单权限
  static async assignMenus(roleId, menuIdList) {
    // 如果是字符串，转为数组
    if (typeof menuIdList === 'string') {
      menuIdList = menuIdList.split(',');
    }
    // 先删除原有
    await RoleMenuModel.deleteMany({ roleId });

    // 批量插入
    const docs = menuIdList.map(menuId => ({ roleId, menuId }));
    await RoleMenuModel.insertMany(docs);
    return true;
  }

  static async getMenuIdsByRoleId(roleId) {
    const list = await RoleMenuModel.find({ roleId });
    // menuId 可能是 ObjectId，转为字符串更通用
    return list.map(item => item.menuId.toString());
  }
}

module.exports = MenuService;