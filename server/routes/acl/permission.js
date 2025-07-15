const express = require('express');
const router = express.Router();
const PermissionController = require('../../controllers/acl/PermissionController');

// 获取所有菜单（树形结构）
router.get('/', PermissionController.getAllPermission);

// 新增或更新菜单
router.post('/save', PermissionController.saveOrUpdatePermission);

// 删除菜单
router.delete('/remove/:id', PermissionController.removePermission);

router.put('/update', PermissionController.updatePermission)

module.exports = router;