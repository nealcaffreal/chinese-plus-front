import type { RouteRecordRaw } from 'vue-router'

/**
 * @description: 获取所有路由数组
 * @param {*}
 * @return {route[]} routes 路由配置数组
 */
export function importAllRoutes(): RouteRecordRaw[] {
  const routesModule: any = import.meta.glob('./modules/*.ts', { eager: true })
  let routesDefault: RouteRecordRaw[] = []
  let routesFullscreen: RouteRecordRaw[] = []
  for (const path in routesModule) {
    const { routeObj } = routesModule[path]
    if (routeObj) {
      if (routeObj?.meta?.layout === 'fullscreen')
        routesFullscreen = [...routesFullscreen, routeObj]
      else
        routesDefault = [...routesDefault, routeObj]
    }
  }
  return [
    {
      path: '/',
      component: async () => (await import('@/components/Layout')).LayoutMain,
      children: routesDefault,
      redirect: '/my',
    },
    ...routesFullscreen,
    // 404 页面
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/404/index.vue'),
    },
  ]
}

/**
 * @description: 获取所有的菜单配置，并排序
 * @param {*}
 * @return {RouteRecordRaw[]} 所有的菜单配置
 */
export function importAllMenus(): RouteRecordRaw[] {
  const menusModule: any = import.meta.glob('./modules/*.ts', { eager: true })
  const menus: RouteRecordRaw[] = []
  for (const path in menusModule) {
    const { routeObj } = menusModule[path]
    if (routeObj && !routeObj?.meta?.layout)
      menus.push(routeObj)
  }
  const menusDefault: RouteRecordRaw[] = menus.sort((a, b) => (a as any).meta.sort - (b as any).meta.sort)
  return menusDefault
}
