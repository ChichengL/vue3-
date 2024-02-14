//对外暴露常量路由

export const routes = [
  {
    //登陆页面
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  {
    //主页面
    patg: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'layout',
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
