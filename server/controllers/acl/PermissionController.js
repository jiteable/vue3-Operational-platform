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

    // 数据验证
    if (!name || name.trim() === '') {
      return res.status(400).json({ code: 400, message: '菜单名称不能为空' });
    }
    if (!code || code.trim() === '') {
      return res.status(400).json({ code: 400, message: '权限标识不能为空' });
    }

    if (id) {
      await PermissionService.updatePermission(id, { name: name.trim(), code: code.trim() });
      res.json({ code: 200, message: '更新成功' });
    } else {
      await PermissionService.createPermission({
        name: name.trim(),
        code: code.trim(),
        level,
        pid: pid || null
      });
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

  static async updatePermission(req, res) {
    const { id, name, code } = req.body;
    console.log('updatePermission 参数:', id, name, code);
    await PermissionService.updatePermission(id, { name, code });
    res.json({ code: 200, message: '更新成功' });
  }
}

module.exports = PermissionController;