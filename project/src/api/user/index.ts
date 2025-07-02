//统一管理咱们项目用户相关的接口
import request from '@/utils/request'
import type {
  loginForm,
  loginResponseData,
  UserResponseData
} from './type'
//项目用户相关的请求地址
const API = {
  LOGIN_URL: 'user/login',
  USERINFO_URL: '/user/info'
} as const

//登录接口
export const reqLogin = (data: loginForm) =>
  request.post<unknown, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = () =>
  request.get<unknown, UserResponseData>(API.USERINFO_URL)
//退出登录
// export const reqLogout = () => request.post<unknown, ResponseData>(API.LOGOUT_URL)
