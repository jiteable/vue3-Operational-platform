import request from '@/utils/request'
import type { MenuParams, PermisstionResponseData } from './type'
//API地址常量
const API = {
  //获取全部菜单与按钮的标识数据
  ALLPERMISSTION_URL: '/admin/acl/permission',
  //给某一一级菜单新增一个子菜单
  ADDMENU_URL: '/admin/acl/permission/save',
  //更新某一个已有的菜单
  UPDATE_URL: '/admin/acl/permission/update',
  //删除已有的菜单
  DELETEMENU_URL: '/admin/acl/permission/remove/',
} as const
//获取菜单数据
export const reqAllPermisstion = () =>
  request.get<unknown, PermisstionResponseData>(API.ALLPERMISSTION_URL)
//添加与更新菜单的方法
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<unknown, PermisstionResponseData>(API.UPDATE_URL, data)
  } else {
    return request.post<unknown, PermisstionResponseData>(API.ADDMENU_URL, data)
  }
}
//删除某一个已有的菜单
export const reqRemoveMenu = (id: number) =>
  request.delete<unknown, PermisstionResponseData>(API.DELETEMENU_URL + id)
