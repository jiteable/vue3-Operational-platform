//通过vue-router插件实现模板路由配置
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'

//创建路由器
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = localStorage.getItem('token')

  // 如果访问登录页，直接放行
  if (to.path === '/login') {
    next()
    return
  }

  // 如果没有 token，重定向到登录页
  if (!token) {
    next('/login')
    return
  }

  // 有 token，放行
  next()
})

// 路由切换后
router.afterEach(() => {
  NProgress.done()
})

export default router