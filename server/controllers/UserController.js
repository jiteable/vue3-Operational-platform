const UserService = require("../services/UserService")
const JWT = require("../utils/JWT")

const UserController = {
  login: async (req, res) => {
    // console.log(req.body)
    const { username, password } = req.body
    // console.log(username, password)
    //req.body
    const result = await UserService.login(username, password)

    if (result.length === 0) {
      res.send({
        code: "-1",
        error: "用户名密码不匹配"
      })
    } else {
      //生成token
      const token = JWT.generate({
        _id: result[0]._id,
        username: result[0].username
      }, "1d")

      res.header("Authorization", token)

      res.send({
        ActionType: "OK",
        data: {
          _id: result[0]._id,
          username: result[0].username,
          gender: result[0].gender ? result[0].gender : 0, // 性别
          introduction: result[0].introduction, //简介
          avatar: result[0].avatar, //头像
          role: result[0].role // 管理员1 , 编辑2
        }
      })
    }
  },
  upload: async (req, res) => {
    try {
      console.log(req.body, req.file)

      const { username, introduction, gender } = req.body
      const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
      //调用service 模块更新 数据

      const token = req.headers["authorization"].split(" ")[1]
      const payload = JWT.verify(token)
      console.log(payload._id, "我")

      // 等待更新操作，如果出错则被catch捕获
      await UserService.upload({ _id: payload._id, username, introduction, gender: Number(gender), avatar })
      if (avatar) {
        res.send({
          ActionType: "OK",
          data: {
            username, introduction,
            gender: Number(gender),
            avatar
          }
        })
      } else {
        res.send({
          ActionType: "OK",
          data: {
            username, introduction,
            gender: Number(gender),
          }
        })
      }
    } catch (error) {
      console.error('上传失败:', error)
      res.status(500).send({
        ActionType: "FAIL",
        message: error.message || '更新失败'
      })
    }
  },
  add: async (req, res) => {
    try {
      const { username, password } = req.body

      // 等待添加操作，如果出错则被catch捕获
      await UserService.add({ username, password })

      res.send({
        ActionType: "OK",
        message: "用户添加成功"
      })
    } catch (error) {
      console.error('添加用户失败:', error)
      res.status(500).send({
        ActionType: "FAIL",
        message: error.message || '添加用户失败'
      })
    }
  },

  getList: async (req, res) => {
    try {
      const result = await UserService.getList(req.params)
      res.send({
        ActionType: 'OK',
        data: result
      })
    } catch (error) {
      console.error('获取用户列表失败:', error)
      res.status(500).send({
        ActionType: 'FAIL',
        message: error.message || '获取用户列表失败'
      })
    }
  },
  putList: async (req, res) => {
    const result = await UserService.putList(req.body)
    res.send({
      ActionType: 'OK'
    })
  },
  delList: async (req, res) => {
    console.log(req.params.id)

    const result = await UserService.delList({ _id: req.params.id })
    res.send({
      ActionType: 'OK'
    })
  },
  getUserInfo: async (req, res) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1]
      if (!token) {
        return res.status(401).send({
          code: 401,
          message: "未提供token"
        })
      }

      const payload = JWT.verify(token)
      if (!payload) {
        return res.status(401).send({
          code: 401,
          message: "token无效"
        })
      }

      const result = await UserService.getUserInfo(payload._id)
      if (!result) {
        return res.status(404).send({
          code: 404,
          message: "用户不存在"
        })
      }

      res.send({
        code: 200,
        data: {
          checkUser: {
            userId: result._id,
            avatar: result.avatar || '',
            username: result.username,
            password: result.password,
            desc: result.desc || '',
            role: result.role || ['editor'],
            buttons: result.buttons || [],
            routes: result.routes || []
          }
        }
      })
    } catch (error) {
      console.error('获取用户信息失败:', error)
      res.status(500).send({
        code: 500,
        message: error.message || '获取用户信息失败'
      })
    }
  },

  register: async (req, res) => {
    try {
      const { username, password } = req.body
      await UserService.register({ username, password })
      res.send({
        ActionType: "OK",
        message: "注册成功"
      })
    } catch (error) {
      console.error('注册失败:', error)
      res.status(500).send({
        ActionType: "FAIL",
        message: error.message || '注册失败'
      })
    }
  }

}

module.exports = UserController