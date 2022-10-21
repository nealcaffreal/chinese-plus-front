import type {
  RouteLocationNormalizedLoaded,
  RouteRecordRaw,
  Router,
} from 'vue-router'
import {
  createRouter,
  createWebHistory,
  useRoute,
} from 'vue-router'
import { importAllRoutes } from './helper'

export const routes: Array<RouteRecordRaw> = importAllRoutes()

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export const route: RouteLocationNormalizedLoaded = useRoute()

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    next()
  }
  else {
    const isLogin = true
    if (isLogin)
      next()

    else
      router.push({ name: 'Login', query: { redirect: to.fullPath } })
  }
})

export default router
