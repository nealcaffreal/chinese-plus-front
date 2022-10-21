import type { RouteRecordRaw } from 'vue-router'

export const routeObj: RouteRecordRaw = {
  path: '/setting',
  name: 'Setting',
  component: async () => (await import('@/components/Layout')).LayoutBlank,
  meta: {
    title: '设置',
    icon: 'color-setting',
    sort: 3,
  },
  redirect: { name: 'SettingTheme' },
  children: [
    {
      path: 'theme',
      name: 'SettingTheme',
      component: () => import('@/views/setting/theme/index.vue'),
      meta: { title: '主题设置' },
    },
  ],
}
