const UserModel = require('../../models/acl/user');
const RoleModel = require('../../models/acl/role');
const UserRoleModel = require('../../models/acl/userRole');

const UserService = {
  // 获取用户分页列表
  getUserList: async ({ page = 1, limit = 10, username = '' }) => {
    const skip = (page - 1) * limit;
    const query = username ? { username: { $regex: username, $options: 'i' } } : {};

    const total = await UserModel.countDocuments(query);
    const records = await UserModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createTime: -1 })
      .lean(); // 转换为普通对象

    // 将 _id 转换为 id
    const formattedRecords = records.map(record => ({
      ...record,
      id: record._id,
      _id: undefined
    }));

    return { records: formattedRecords, total, size: limit, current: page, pages: Math.ceil(total / limit) };
  },

  // 添加用户
  addUser: async (userData) => {
    return UserModel.create(userData);
  },

  // 更新用户
  updateUser: async (userId, userData) => {
    return UserModel.findByIdAndUpdate(userId, userData, { new: true });
  },

  // 删除用户
  deleteUser: async (userId) => {
    // 删除用户的同时删除用户角色关联
    await UserRoleModel.deleteMany({ userId });
    return UserModel.findByIdAndDelete(userId);
  },

  // 批量删除用户
  batchDeleteUsers: async (userIds) => {
    // 删除用户角色关联
    await UserRoleModel.deleteMany({ userId: { $in: userIds } });
    return UserModel.deleteMany({ _id: { $in: userIds } });
  },

  // 获取用户角色信息
  getUserRoles: async (userId) => {
    try {
      // 获取所有角色
      const allRoles = await RoleModel.find().sort({ createTime: -1 }).lean();

      // 获取用户已分配的角色
      const userRoles = await UserRoleModel.find({ userId })
        .populate('roleId')
        .sort({ createTime: -1 })
        .lean();

      // 过滤掉没有角色数据的记录，并确保格式与前端 RoleData 接口一致
      const assignRoles = userRoles
        .filter(ur => ur.roleId) // 确保 roleId 存在
        .map(ur => ({
          id: ur.roleId._id.toString(), // 转换为字符串
          createTime: ur.roleId.createTime,
          updateTime: ur.roleId.updateTime,
          roleName: ur.roleId.roleName,
          remark: ur.roleId.remark || null
        }));

      // 格式化角色列表，确保格式与前端 RoleData 接口一致
      const formattedAllRoles = allRoles.map(role => ({
        id: role._id.toString(), // 转换为字符串
        createTime: role.createTime,
        updateTime: role.updateTime,
        roleName: role.roleName,
        remark: role.remark || null
      }));

      console.log('服务层返回的数据:', {
        assignRoles,
        allRolesList: formattedAllRoles
      });

      return {
        assignRoles,
        allRolesList: formattedAllRoles
      };
    } catch (error) {
      console.error('获取用户角色信息失败:', error);
      throw error;
    }
  },

  // 分配用户角色
  assignUserRoles: async (userId, roleIds) => {
    // 先删除用户现有角色
    await UserRoleModel.deleteMany({ userId });

    // 添加新角色
    const userRoles = roleIds.map(roleId => ({
      userId,
      roleId
    }));

    return UserRoleModel.insertMany(userRoles);
  },

  // 根据ID获取用户
  getUserById: async (userId) => {
    return UserModel.findById(userId);
  }
};

module.exports = UserService; 