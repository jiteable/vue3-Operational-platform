//定义用户相关数据的ts类型

//定义登录接口携带参数的ts类型
export interface loginForm {
  username: string,
  password: string
}

//定义登录接口返回数据类型
interface loginDataType {
  token: string,
  _id: string,
  username: string,
  gender?: number,
  introduction?: string,
  avatar?: string,
  role?: string[]
}

export interface loginResponseData {
  code: number,
  message: string,
  ok: boolean,
  data: loginDataType
}

//定义获取用户信息返回数据类型
interface userInfo {
  userId: string,
  avatar: string,
  username: string,
  password: string,
  desc: string,
  role: string[],
  buttons: string[],
  routes: string[],
}

interface user {
  checkUser: userInfo
}

export interface UserResponseData {
  code: number,
  message: string,
  ok: boolean,
  data: user
}