const Role = require('../../models/acl/role');

class RoleService {
  // 获取角色列表（分页）
  static async getRoleList(page, limit, roleName = '') {
    try {
      const skip = (page - 1) * limit;
      const query = roleName ? { roleName: { $regex: roleName, $options: 'i' } } : {};

      const [records, total] = await Promise.all([
        Role.find(query).skip(skip).limit(limit).sort({ createTime: -1 }),
        Role.countDocuments(query)
      ]);

      return {
        records,
        total,
        size: limit,
        current: page,
        orders: [],
        optimizeCountSql: true,
        hitCount: false,
        countId: null,
        maxLimit: null,
        searchCount: true,
        pages: Math.ceil(total / limit)
      };
    } catch (error) {
      throw new Error('获取角色列表失败: ' + error.message);
    }
  }

  // 添加角色
  static async addRole(roleData) {
    try {
      const role = new Role({
        roleName: roleData.roleName,
        remark: roleData.remark || null,
        createTime: new Date(),
        updateTime: new Date()
      });

      const savedRole = await role.save();
      return savedRole;
    } catch (error) {
      throw new Error('添加角色失败: ' + error.message);
    }
  }

  // 更新角色
  static async updateRole(roleData) {
    try {
      const { id, roleName, remark } = roleData;

      const updatedRole = await Role.findByIdAndUpdate(
        id,
        {
          roleName,
          remark: remark || null,
          updateTime: new Date()
        },
        { new: true }
      );

      if (!updatedRole) {
        throw new Error('角色不存在');
      }

      return updatedRole;
    } catch (error) {
      throw new Error('更新角色失败: ' + error.message);
    }
  }

  // 删除角色
  static async deleteRole(roleId) {
    try {
      const deletedRole = await Role.findByIdAndDelete(roleId);

      if (!deletedRole) {
        throw new Error('角色不存在');
      }

      return deletedRole;
    } catch (error) {
      throw new Error('删除角色失败: ' + error.message);
    }
  }

  // 获取所有角色（不分页）
  static async getAllRoles() {
    try {
      const roles = await Role.find().sort({ createTime: -1 });
      return roles;
    } catch (error) {
      throw new Error('获取所有角色失败: ' + error.message);
    }
  }

  // 根据ID获取角色
  static async getRoleById(roleId) {
    try {
      const role = await Role.findById(roleId);
      if (!role) {
        throw new Error('角色不存在');
      }
      return role;
    } catch (error) {
      throw new Error('获取角色失败: ' + error.message);
    }
  }
}

module.exports = RoleService; 