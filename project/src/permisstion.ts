// 权限管理
import useUserStore from '@/store/modules/user'
import { getToken } from '@/utils/token'
import { ElMessage } from 'element-plus'
import router from './router'

// 路由白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  console.log('路由守卫触发:', to.path, 'from:', from.path)

  // 获取token
  const token = getToken()
  console.log('当前token:', token)

  // 如果有token
  if (token) {
    if (to.path === '/login') {
      // 如果已登录且访问登录页，重定向到首页
      console.log('已登录，重定向到首页')
      next('/')
    } else {
      // 获取用户信息
      const userStore = useUserStore()
      if (userStore.username) {
        // 已有用户信息，直接放行
        console.log('已有用户信息，直接放行')
        next()
      } else {
        try {
          // 获取用户信息
          console.log('获取用户信息...')
          await userStore.userInfo()
          console.log('用户信息获取成功')
          next()
        } catch (error) {
          console.error('获取用户信息失败:', error)
          // 清除token
          localStorage.removeItem('token')
          ElMessage.error('登录已过期，请重新登录')
          next('/login')
        }
      }
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      // 白名单中的页面，直接放行
      console.log('白名单页面，直接放行')
      next()
    } else {
      // 重定向到登录页
      console.log('无token，重定向到登录页')
      next('/login')
    }
  }
})

