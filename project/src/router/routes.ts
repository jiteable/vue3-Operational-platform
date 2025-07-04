

//对外暴露配置路由
export const constantRoute = [
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/IndexLogin.vue'),
    name: 'login',//命名路由
    meta: {
      title: '登录',
      hidden: true,//代表路由标题在菜单是否隐藏
      icon: 'Promotion'
    }
  }, {
    path: '/',
    component: () => import('@/layout/IndexLayout.vue'),
    name: 'layout',
    meta: {
      title: 'layout',
      hidden: false,
      icon: 'Avatar'
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/IndexHome.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled'
        },
        name: 'home',
      },
    ]
  }, {
    path: '/404',
    component: () => import('@/views/404/IndexErr.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'WarningFilled'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: 'Any',
      hidden: true
    }
  }
]