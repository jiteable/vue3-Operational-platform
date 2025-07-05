// 权限管理
import router from './router'

router.beforeEach((to, from, next) => {
  console.log(123)

  next()
})

