//定义小仓库数据state类型
import type { RouteRecordRaw } from 'vue-router'
export interface UserState {
  token: string | null,
  username: string | null,
  avatar: string | null,
  roles: string[],
  buttons: string[],
  routes: string[],
  menuRoutes: RouteRecordRaw[]
}


//定义分类仓库state对象的ts类型
import type { CategoryObj } from '../../../api/product/attr/type'
export interface CategoryState {
  c1Id: string | number
  c1Arr: CategoryObj[]
  c2Id: string | number
  c2Arr: CategoryObj[]
  c3Id: string | number
  c3Arr: CategoryObj[]
}