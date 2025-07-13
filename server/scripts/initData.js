const mongoose = require('mongoose');
const RoleModel = require('../models/acl/role');
const UserModel = require('../models/acl/user');

// 初始化角色数据
const initRoles = async () => {
  try {
    const roles = [
      { roleName: '超级管理员', remark: '拥有所有权限' },
      { roleName: '管理员', remark: '拥有大部分权限' },
      { roleName: '编辑员', remark: '拥有编辑权限' },
      { roleName: '查看员', remark: '只有查看权限' }
    ];

    for (const role of roles) {
      const existingRole = await RoleModel.findOne({ roleName: role.roleName });
      if (!existingRole) {
        await RoleModel.create(role);
        console.log(`角色 "${role.roleName}" 创建成功`);
      }
    }
    console.log('角色数据初始化完成');
  } catch (error) {
    console.error('初始化角色数据失败:', error);
  }
};

// 初始化管理员用户
const initAdminUser = async () => {
  try {
    const adminUser = {
      username: 'admin',
      password: '123456',
      name: '超级管理员',
      phone: null,
      roleName: '超级管理员'
    };

    const existingUser = await UserModel.findOne({ username: adminUser.username });
    if (!existingUser) {
      await UserModel.create(adminUser);
      console.log('管理员用户创建成功');
    }
    console.log('用户数据初始化完成');
  } catch (error) {
    console.error('初始化用户数据失败:', error);
  }
};

// 运行初始化
const runInit = async () => {
  try {
    await initRoles();
    await initAdminUser();
    console.log('所有数据初始化完成');
    process.exit(0);
  } catch (error) {
    console.error('初始化失败:', error);
    process.exit(1);
  }
};

// 如果直接运行此脚本
if (require.main === module) {
  // 连接数据库
  mongoose.connect('mongodb://localhost:27017/operation-platform').then(() => {
    console.log('数据库连接成功');
    runInit();
  }).catch((error) => {
    console.error('数据库连接失败:', error);
    process.exit(1);
  });
}

module.exports = { initRoles, initAdminUser }; 