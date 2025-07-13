const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/acl/UserController');

// 获取用户角色信息 - 这个路由必须在用户列表路由之前
router.get('/user/toAssign/:userId', UserController.getUserRoles);

// 分配用户角色
router.post('/user/doAssignRole', UserController.assignUserRoles);

// 获取用户列表
router.get('/user/:page/:limit', UserController.getUserList);

// 添加用户
router.post('/user/save', UserController.addUser);

// 更新用户
router.put('/user/update', UserController.updateUser);

// 删除用户
router.delete('/user/remove/:userId', UserController.deleteUser);

// 批量删除用户
router.delete('/user/batchRemove', UserController.batchDeleteUsers);

module.exports = router;
