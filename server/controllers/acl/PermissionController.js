const PermissionService = require('../../services/acl/PermissionService');

class PermissionController {
  // 获取所有菜单（树形结构）
  static async getAllPermission(req, res) {
    const tree = await PermissionService.getAllPermissionTree();
    res.json({ code: 200, data: tree });
  }

  // 新增或更新菜单
  static async saveOrUpdatePermission(req, res) {
    const { id, name, code, level, pid } = req.body;
    if (id) {
      await PermissionService.updatePermission(id, { name, code });
      res.json({ code: 200, message: '更新成功' });
    } else {
      await PermissionService.createPermission({ name, code, level, pid: pid || null });
      res.json({ code: 200, message: '添加成功' });
    }
  }

  // 删除菜单
  static async removePermission(req, res) {
    const { id } = req.params;
    const result = await PermissionService.removePermission(id);
    if (result.success) {
      res.json({ code: 200, message: '删除成功' });
    } else {
      res.json({ code: 400, message: result.message });
    }
  }
}

module.exports = PermissionController;