const mongoose = require('mongoose');
const UserModel = require('../models/UserModel')

const UserService = {
  login: async (username, password) => {
    return UserModel.find({
      username,
      password
    })
  },
  upload: async ({ _id, username, introduction, gender, avatar }) => {
    if (avatar) {
      return UserModel.updateOne({
        _id
      }, {
        username, introduction, gender, avatar
      })
    } else {
      return UserModel.updateOne({
        _id
      }, {
        username, introduction, gender
      })
    }
  },
  add: async ({ username, password }) => {
    return UserModel.create({ username, password, role: ['editor'] })
  },

  getList: async ({ id }) => {
    if (!id) {
      return UserModel.find({}, ["username", "role", "avatar", "introduction", "gender"])
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(`Invalid ObjectId provided: ${id}`);
      return [];
    }
    try {
      return await UserModel.find({ _id: id }, ["username", "role", "introduction", "avatar"])
    } catch (error) {
      console.error('获取用户列表失败:', error)
      return []
    }
  },

  delList: async (_id) => {
    return UserModel.deleteOne({ _id })
  },
  putList: async (body) => {
    return UserModel.updateOne({ _id: body._id }, body)
  },
  getUserInfo: async (userId) => {
    return UserModel.findById(userId)
  },
  register: async ({ username, password }) => {
    return UserModel.create({ username, password, role: ['editor'] })
  },
}

module.exports = UserService