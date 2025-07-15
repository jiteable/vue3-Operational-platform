const express = require('express');
const router = express.Router();
const MenuController = require('../../controllers/acl/MenuController');

// 获取角色菜单树
router.get('/toAssign/:id', MenuController.toAssign);

// 分配菜单权限
router.post('/doAssign', MenuController.doAssign);

module.exports = router;