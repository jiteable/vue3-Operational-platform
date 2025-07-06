var express = require('express');
var UserRouter = express.Router();
const UserController = require('../controllers/UserController')

//图片上传
// const multer = require('multer')
// const upload = multer({ dest: 'public/avataruploads/' })


// UserRouter.get("/adminapi/user/home", (req, res) => {
//   res.send({ ok: 1 })
// })

UserRouter.post("/admin/acl/index/login", UserController.login) // 后端的 app.post 方法用于处理前端发送的 POST 请求，并获取传递的数据

UserRouter.get("/admin/acl/index/info", UserController.getUserInfo) // 获取用户信息

UserRouter.post("/admin/acl/user/upload", UserController.upload)

UserRouter.post("/admin/acl/user/add", UserController.add)

UserRouter.get("/admin/acl/user/list", UserController.getList)

UserRouter.delete("/admin/acl/user/list/:id", UserController.delList)

UserRouter.get("/admin/acl/user/list/:id", UserController.getList)

UserRouter.put("/admin/acl/user/list/:id", UserController.putList)

UserRouter.post("/admin/acl/user/register", UserController.register)

module.exports = UserRouter;