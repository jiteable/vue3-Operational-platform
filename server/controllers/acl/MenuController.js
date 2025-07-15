const MenuService = require('../../services/acl/MenuService');
const MenuModel = require('../../models/acl/menu');

// 递归组装树形结构
function buildMenuTree(menuList, checkedIds, pid = null, level = 1) {
  return menuList
    .filter(item => String(item.pid) === String(pid))
    .map(item => {
      const children = buildMenuTree(menuList, checkedIds, item._id, level + 1);
      return {
        id: item._id,
        label: item.name,
        level,
        select: checkedIds.includes(String(item._id)),
        children: children.length ? children : undefined
      };
    });
}

class MenuController {
  // 获取角色菜单树及已选中
  static async toAssign(req, res) {
    const roleId = req.params.id;
    const menuList = await MenuService.getAllMenus();
    const checkedIds = await MenuService.getRoleMenuIds(roleId);
    const tree = buildMenuTree(menuList, checkedIds);
    res.json({ code: 200, data: tree });
  }

  // 给角色分配菜单权限
  static async doAssign(req, res) {
    const { roleId, permissionId } = req.body; // permissionId为菜单id数组
    await MenuService.assignMenus(roleId, permissionId);
    res.json({ code: 200, message: '分配成功' });
  }
}

module.exports = MenuController;