//用户管理模块的接口
import request from '@/utils/request'
import type {
  AllRoleResponseData,
  ResponseData,
  SetRoleData,
  User,
  UserResponseData
} from './type'
//API地址常量
const API = {
  //获取全部已有用户账号信息
  ALLUSER_URL: '/admin/acl/user/',
  //添加一个新的用户账号
  ADDUSER_URL: '/admin/acl/user/save',
  //更新已有的用户账号
  UPDATEUSER_URL: '/admin/acl/user/update',
  //获取全部职位,当前账号拥有的职位接口
  ALLROLEURL: '/admin/acl/user/toAssign/',
  //给已有的用户分配角色接口
  SETROLE_URL: '/admin/acl/user/doAssignRole',
  //删除某一个账号
  DELETEUSER_URL: '/admin/acl/user/remove/',
  //批量删除的接口
  DELETEALLUSER_URL: '/admin/acl/user/batchRemove',
} as const
//获取用户账号信息的接口
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<unknown, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
  )
//添加用户与更新已有用户的接口
export const reqAddOrUpdateUser = (data: User) => {
  //携带参数有ID更新
  if (data.id) {
    return request.put<unknown, ResponseData>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<unknown, ResponseData>(API.ADDUSER_URL, data)
  }
}
//获取全部职位以及包含当前用户的已有的职位
export const reqAllRole = (userId: string) =>
  request.get<unknown, AllRoleResponseData>(API.ALLROLEURL + userId)
//分配职位
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<unknown, ResponseData>(API.SETROLE_URL, data)
//删除某一个账号的信息
export const reqRemoveUser = (userId: number) =>
  request.delete<unknown, ResponseData>(API.DELETEUSER_URL + userId)
//批量删除的接口
export const reqSelectUser = (idList: number[]) =>
  request.delete<unknown, ResponseData>(API.DELETEALLUSER_URL, { data: idList })
