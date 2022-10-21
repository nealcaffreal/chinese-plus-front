import type { RouteRecordRaw } from 'vue-router'

export const routeObj: RouteRecordRaw = {
  path: '/my',
  name: 'My',
  component: async () => (await import('@/components/Layout')).LayoutBlank,
  meta: {
    title: '我的看板',
    icon: 'color-dashboard',
    sort: 0,
  },
  redirect: { name: 'MyHome' },
  children: [
    {
      path: 'home',
      name: 'MyHome',
      component: () => import('@/views/my/home/index.vue'),
      meta: { title: '首页' },
    },
    // {
    //   path: "reflect",
    //   name: "MyReflect",
    //   component: () => import("@/views/my/reflect/index.vue"),
    //   meta: { title: '信息即示' }
    // }
    // {
    //   path: "test",
    //   name: "MyTest",
    //   component: () => import("@/views/my/test/index.vue"),
    //   meta: { title: '测试' }
    // }
  ],
}
