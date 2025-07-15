

//对外暴露配置路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/IndexLogin.vue'),
    name: 'login',
    meta: { title: '登录', hidden: true, icon: 'Promotion' }
  },
  {
    path: '/',
    component: () => import('@/layout/IndexLayout.vue'),
    name: 'layout',
    redirect: '/home',
    children: [
      {
        path: 'home', // 注意不要加斜杠
        component: () => import('@/views/home/IndexHome.vue'),
        name: 'home',
        meta: { title: '首页', icon: 'HomeFilled' }
      }
    ]
  },
  {
    path: '/center',
    component: () => import('@/views/login/IndexLogin.vue'),
    name: 'center',
    meta: {
      title: '个人中心',
      icon: 'User',
      hidden: true,
    },
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/IndexScreen.vue'),
    name: 'screen',
    meta: { title: '数据大屏', icon: 'DataLine' }
  },
  {
    path: '/acl',
    component: () => import('@/layout/IndexLayout.vue'),
    name: 'acl',
    meta: { title: '权限管理', icon: 'Lock' },
    children: [
      {
        path: 'user',
        component: () => import('@/views/acl/user/IndexUser.vue'),
        name: 'user',
        meta: { title: '用户管理', icon: 'User' }
      },
      {
        path: 'role',
        component: () => import('@/views/acl/role/IndexRole.vue'),
        name: 'role',
        meta: { title: '角色管理', icon: 'UserFilled' }
      },
      {
        path: 'menu',
        component: () => import('@/views/acl/permisstion/IndexPermission.vue'),
        name: 'menu',
        meta: { title: '菜单管理', icon: 'Grid' }
      }
    ]
  },
  {
    path: '/product',
    component: () => import('@/layout/IndexLayout.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      {
        path: 'trademark',
        component: () => import('@/views/product/trademark/IndexTrademark.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: 'attr',
        component: () => import('@/views/product/attr/IndexAttr.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: 'spu',
        component: () => import('@/views/product/spu/IndexSpu.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar',
        },
      },
      {
        path: 'sku',
        component: () => import('@/views/product/sku/IndexSku.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Orange',
        },
      },
    ],
  },
  {
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