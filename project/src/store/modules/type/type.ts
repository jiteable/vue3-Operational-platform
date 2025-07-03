//定义小仓库数据state类型
export interface UserState {
  token: string | null,
  username: string | null,
  avatar: string | null,
  roles: string[],
  buttons: string[],
  routes: string[]
}