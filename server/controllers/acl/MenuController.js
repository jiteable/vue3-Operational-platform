const MenuService = require('../../services/acl/MenuService');
const MenuModel = require('../../models/acl/menu');

class MenuController {
  // 获取角色菜单树及已选中
  static async toAssign(req, res) {
    const roleId = req.params.id;
    console.log(roleId, 'roleId')
    const menuIds = await MenuService.getMenuIdsByRoleId(roleId);
    res.json({ code: 200, data: menuIds });
  }

  // 给角色分配菜单权限
  static async doAssign(req, res) {
    const { roleId, permissionId } = req.query; // permissionId为菜单id数组
    console.log(roleId, permissionId, 'roleId, permissionId')
    await MenuService.assignMenus(roleId, permissionId);
    res.json({ code: 200, message: '分配成功' });
  }
}

module.exports = MenuController;