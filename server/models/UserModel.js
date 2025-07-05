const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserType = {
  avatar: String,
  username: String,
  password: String,
  desc: String,
  role: [String],
  buttons: [String],
  routes: [String],
  token: String
}

const UserModel = mongoose.model("user", new Schema(UserType))

module.exports = UserModel