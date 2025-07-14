const express = require('express');
const router = express.Router();
const RoleController = require('../../controllers/acl/RoleController');

// 获取角色列表（分页）
router.get('/:page/:limit', RoleController.getRoleList);

// 添加角色
router.post('/save', RoleController.addRole);

// 更新角色
router.put('/update', RoleController.updateRole);

// 删除角色
router.delete('/remove/:roleId', RoleController.deleteRole);

// 获取所有角色（不分页）
router.get('/all', RoleController.getAllRoles);

module.exports = router;