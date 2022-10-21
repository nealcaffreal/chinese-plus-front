import type { RouteRecordRaw } from 'vue-router'
import { importAllMenus } from './helper'

export const menus: RouteRecordRaw[] = importAllMenus()
