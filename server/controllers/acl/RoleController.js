const RoleService = require('../../services/acl/RoleService');

class RoleController {
  // 获取角色列表
  static async getRoleList(req, res) {
    try {
      const { page, limit } = req.params;
      const { roleName } = req.query;

      const result = await RoleService.getRoleList(parseInt(page), parseInt(limit), roleName);

      res.json({
        code: 200,
        message: '获取角色列表成功',
        ok: true,
        data: result
      });
    } catch (error) {
      console.error('获取角色列表失败:', error);
      res.status(500).json({
        code: 500,
        message: '获取角色列表失败',
        ok: false
      });
    }
  }

  // 添加角色
  static async addRole(req, res) {
    try {
      const roleData = req.body;
      const result = await RoleService.addRole(roleData);

      res.json({
        code: 200,
        message: '添加角色成功',
        ok: true,
        data: result
      });
    } catch (error) {
      console.error('添加角色失败:', error);
      res.status(500).json({
        code: 500,
        message: '添加角色失败',
        ok: false
      });
    }
  }

  // 更新角色
  static async updateRole(req, res) {
    try {
      const roleData = req.body;
      const result = await RoleService.updateRole(roleData);

      res.json({
        code: 200,
        message: '更新角色成功',
        ok: true,
        data: result
      });
    } catch (error) {
      console.error('更新角色失败:', error);
      res.status(500).json({
        code: 500,
        message: '更新角色失败',
        ok: false
      });
    }
  }

  // 删除角色
  static async deleteRole(req, res) {
    try {
      const { roleId } = req.params;
      await RoleService.deleteRole(roleId);

      res.json({
        code: 200,
        message: '删除角色成功',
        ok: true
      });
    } catch (error) {
      console.error('删除角色失败:', error);
      res.status(500).json({
        code: 500,
        message: '删除角色失败',
        ok: false
      });
    }
  }

  // 获取所有角色（不分页）
  static async getAllRoles(req, res) {
    try {
      const result = await RoleService.getAllRoles();

      res.json({
        code: 200,
        message: '获取所有角色成功',
        ok: true,
        data: result
      });
    } catch (error) {
      console.error('获取所有角色失败:', error);
      res.status(500).json({
        code: 500,
        message: '获取所有角色失败',
        ok: false
      });
    }
  }
}

module.exports = RoleController;

