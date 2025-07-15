const UserService = require('../../services/acl/UserService');
const RoleModel = require('../../models/acl/role');

const UserController = {
  // 获取用户列表
  getUserList: async (req, res) => {
    try {
      const { page, limit } = req.params;
      const { username } = req.query;

      const data = await UserService.getUserList({
        page: parseInt(page),
        limit: parseInt(limit),
        username: username || ''
      });

      res.json({
        code: 200,
        message: '获取成功',
        ok: true,
        data
      });
    } catch (error) {
      console.error('获取用户列表失败:', error);
      res.status(500).json({
        code: 500,
        message: error.message || '获取用户列表失败',
        ok: false
      });
    }
  },

  // 添加用户
  addUser: async (req, res) => {
    try {
      const userData = req.body;
      // 移除 id 字段，让 MongoDB 自动生成 _id

      const viewerRole = await RoleModel.findOne({ roleName: '普通用户' });
      userData.roleName = viewerRole.roleName;
      delete userData.id;
      await UserService.addUser(userData);

      res.json({
        code: 200,
        message: '添加成功',
        ok: true
      });
    } catch (error) {
      console.error('添加用户失败:', error);
      res.status(500).json({
        code: 500,
        message: error.message || '添加用户失败',
        ok: false
      });
    }
  },

  // 更新用户
  updateUser: async (req, res) => {
    try {
      const userData = req.body;
      const { id } = userData;

      if (!id) {
        return res.status(400).json({
          code: 400,
          message: '用户ID不能为空',
          ok: false
        });
      }

      // 移除 id 字段，避免更新时冲突
      delete userData.id;
      await UserService.updateUser(id, userData);

      res.json({
        code: 200,
        message: '更新成功',
        ok: true
      });
    } catch (error) {
      console.error('更新用户失败:', error);
      res.status(500).json({
        code: 500,
        message: error.message || '更新用户失败',
        ok: false
      });
    }
  },

  // 删除用户
  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
      await UserService.deleteUser(userId);

      res.json({
        code: 200,
        message: '删除成功',
        ok: true
      });
    } catch (error) {
      console.error('删除用户失败:', error);
      res.status(500).json({
        code: 500,
        message: error.message || '删除用户失败',
        ok: false
      });
    }
  },

  // 批量删除用户
  batchDeleteUsers: async (req, res) => {
    try {
      const { idList } = req.body;

      if (!idList || !Array.isArray(idList)) {
        return res.status(400).json({
          code: 400,
          message: '用户ID列表不能为空',
          ok: false
        });
      }

      await UserService.batchDeleteUsers(idList);

      res.json({
        code: 200,
        message: '批量删除成功',
        ok: true
      });
    } catch (error) {
      console.error('批量删除用户失败:', error);
      res.status(500).json({
        code: 500,
        message: error.message || '批量删除用户失败',
        ok: false
      });
    }
  },

  // 获取用户角色信息
  getUserRoles: async (req, res) => {
    try {
      const { userId } = req.params;
      console.log('控制器接收到请求，用户ID:', userId);

      const data = await UserService.getUserRoles(userId);
      console.log('控制器返回的数据:', data);

      res.json({
        code: 200,
        message: '获取成功',
        ok: true,
        data
      });
    } catch (error) {
      console.error('获取用户角色失败:', error);
      res.status(500).json({
        code: 500,
        message: error.message || '获取用户角色失败',
        ok: false
      });
    }
  },

  // 分配用户角色
  assignUserRoles: async (req, res) => {
    try {
      const { userId, roleIdList } = req.body;

      if (!userId || !roleIdList || !Array.isArray(roleIdList)) {
        return res.status(400).json({
          code: 400,
          message: '参数错误',
          ok: false
        });
      }

      await UserService.assignUserRoles(userId, roleIdList);

      res.json({
        code: 200,
        message: '分配角色成功',
        ok: true
      });
    } catch (error) {
      console.error('分配用户角色失败:', error);
      res.status(500).json({
        code: 500,
        message: error.message || '分配用户角色失败',
        ok: false
      });
    }
  }
};

module.exports = UserController; 