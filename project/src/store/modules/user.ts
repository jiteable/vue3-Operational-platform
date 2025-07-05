import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type'
import { constantRoute } from '@/router/routes'
import { getToken, setToken } from '@/utils/token'
import { defineStore } from 'pinia'
import type { UserState } from './type/type'

const useUserStore = defineStore('User', {
  state: (): UserState => ({
    token: getToken() || '',
    username: '',
    avatar: '',
    roles: [] as string[],
    buttons: [] as string[],
    routes: [] as string[],
    menuRoutes: constantRoute
  }),

  actions: {
    // 用户登录
    async userLogin(data: loginForm) {
      try {
        const result: loginResponseData = await reqLogin(data)
        if (result.code === 200) {
          this.token = (result.data.token as string)
          // 设置 token 过期时间 默认 24 小时）
          setToken(result.data.token as string)
          return 'ok'
        } else {
          return Promise.reject(new Error('登录失败'))
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },

    // 获取用户信息
    async userInfo() {
      try {
        const result = await reqUserInfo()
        if (result.code === 200) {
          const userInfo = result.data.checkUser
          this.username = userInfo.username
          this.avatar = userInfo.avatar
          this.roles = userInfo.role
          this.buttons = userInfo.buttons
          this.routes = userInfo.routes
          return 'ok'
        } else {
          return Promise.reject(new Error('获取用户信息失败'))
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },

    // 退出登录
    async userLogout() {
      try {
        // 清除本地状态
        this.token = ''
        this.username = ''
        this.avatar = ''
        this.roles = []
        this.buttons = []
        this.routes = []
        localStorage.removeItem('token')
        return 'ok'
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },

  getters: {
    // 获取用户名
    getUsername: (state) => state.username,
    // 获取头像
    getAvatar: (state) => state.avatar,
    // 获取角色
    getRoles: (state) => state.roles,
    // 获取按钮权限
    getButtons: (state) => state.buttons,
    // 获取路由权限
    getRoutes: (state) => state.routes
  }
})

export default useUserStore