import type { RouteRecordRaw } from 'vue-router'

export const routeObj: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    layout: 'fullscreen',
  },
}
