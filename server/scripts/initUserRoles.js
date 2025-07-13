const mongoose = require('mongoose');
const UserModel = require('../models/acl/user');
const RoleModel = require('../models/acl/role');
const UserRoleModel = require('../models/acl/userRole');

// 初始化用户角色关联数据
const initUserRoles = async () => {
  try {
    console.log('开始初始化用户角色关联数据...');

    // 获取所有用户
    const users = await UserModel.find().lean();
    console.log(`找到 ${users.length} 个用户`);

    // 获取所有角色
    const roles = await RoleModel.find().lean();
    console.log(`找到 ${roles.length} 个角色`);

    if (users.length === 0) {
      console.log('没有找到用户数据，请先运行 initData.js 初始化用户数据');
      return;
    }

    if (roles.length === 0) {
      console.log('没有找到角色数据，请先运行 initData.js 初始化角色数据');
      return;
    }

    // 清除现有的用户角色关联数据
    await UserRoleModel.deleteMany({});
    console.log('已清除现有的用户角色关联数据');

    // 为每个用户分配角色
    const userRoleData = [];

    for (const user of users) {
      // 根据用户名分配不同的角色
      let roleIds = [];

      if (user.username === 'admin') {
        // 超级管理员拥有所有角色
        roleIds = roles.map(role => role._id);
      } else if (user.username.includes('manager')) {
        // 管理员角色
        const managerRole = roles.find(role => role.roleName === '管理员');
        if (managerRole) {
          roleIds = [managerRole._id];
        }
      } else if (user.username.includes('editor')) {
        // 编辑员角色
        const editorRole = roles.find(role => role.roleName === '编辑员');
        if (editorRole) {
          roleIds = [editorRole._id];
        }
      } else {
        // 普通用户默认分配查看员角色
        const viewerRole = roles.find(role => role.roleName === '查看员');
        if (viewerRole) {
          roleIds = [viewerRole._id];
        }
      }

      // 创建用户角色关联数据
      for (const roleId of roleIds) {
        userRoleData.push({
          userId: user._id,
          roleId: roleId,
          createTime: new Date()
        });
      }

      console.log(`用户 "${user.username}" 分配了 ${roleIds.length} 个角色`);
    }

    // 批量插入用户角色关联数据
    if (userRoleData.length > 0) {
      await UserRoleModel.insertMany(userRoleData);
      console.log(`成功创建 ${userRoleData.length} 条用户角色关联数据`);
    }

    // 验证数据
    const totalUserRoles = await UserRoleModel.countDocuments();
    console.log(`数据库中总共有 ${totalUserRoles} 条用户角色关联记录`);

    // 显示每个用户的角色信息
    for (const user of users) {
      const userRoles = await UserRoleModel.find({ userId: user._id })
        .populate('roleId')
        .lean();

      const roleNames = userRoles.map(ur => ur.roleId?.roleName).filter(Boolean);
      console.log(`用户 "${user.username}" 的角色: ${roleNames.join(', ')}`);
    }

    console.log('用户角色关联数据初始化完成');
  } catch (error) {
    console.error('初始化用户角色关联数据失败:', error);
  }
};

// 添加更多测试用户
const addTestUsers = async () => {
  try {
    console.log('开始添加测试用户...');

    const testUsers = [
      {
        username: 'manager001',
        password: '123456',
        name: '张经理',
        phone: '13800138001',
        roleName: '管理员'
      },
      {
        username: 'editor001',
        password: '123456',
        name: '李编辑',
        phone: '13800138002',
        roleName: '编辑员'
      },
      {
        username: 'viewer001',
        password: '123456',
        name: '王查看',
        phone: '13800138003',
        roleName: '查看员'
      },
      {
        username: 'manager002',
        password: '123456',
        name: '赵经理',
        phone: '13800138004',
        roleName: '管理员'
      }
    ];

    for (const userData of testUsers) {
      const existingUser = await UserModel.findOne({ username: userData.username });
      if (!existingUser) {
        await UserModel.create(userData);
        console.log(`测试用户 "${userData.username}" 创建成功`);
      } else {
        console.log(`测试用户 "${userData.username}" 已存在`);
      }
    }

    console.log('测试用户添加完成');
  } catch (error) {
    console.error('添加测试用户失败:', error);
  }
};

// 运行初始化
const runInit = async () => {
  try {
    await addTestUsers();
    await initUserRoles();
    console.log('所有用户角色关联数据初始化完成');
    process.exit(0);
  } catch (error) {
    console.error('初始化失败:', error);
    process.exit(1);
  }
};

// 如果直接运行此脚本
if (require.main === module) {
  // 连接数据库
  mongoose.connect('mongodb://127.0.0.1:27017/operation-platform').then(() => {
    console.log('数据库连接成功');
    runInit();
  }).catch((error) => {
    console.error('数据库连接失败:', error);
    process.exit(1);
  });
}

module.exports = { initUserRoles, addTestUsers }; 