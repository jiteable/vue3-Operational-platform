const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserType = {
  avatar: { type: String, default: '' },
  username: { type: String, required: true },
  password: { type: String, required: true },
  desc: { type: String, default: '' },
  role: { type: [String], default: ['editor'] },
  buttons: { type: [String], default: [] },
  routes: { type: [String], default: [] },
}

const UserModel = mongoose.model("user", new Schema(UserType))

module.exports = UserModel