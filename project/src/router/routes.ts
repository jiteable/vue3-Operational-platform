
//对外暴露配置路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/IndexLogin.vue'),
    name: 'login',//命名路由
  }, {
    path: '/',
    component: () => import('@/layout/IndexLayout.vue'),
    name: 'layout'
  }, {
    path: '/404',
    component: () => import('@/views/404/IndexErr.vue'),
    name: '404'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any'
  }
]