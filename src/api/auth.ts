import { REQUEST } from './base'

// 用户登录
export interface User {
  authAccount: string
  authType: string
  status: string
  userId: string
}

interface ParamsLogin {
  username: string
  password: string
}

// 登录
export function login(data: ParamsLogin) {
  return REQUEST.post<{ data: User; authtoken: string }>('/auth/login', data)
}

// 修改密码
export function changePassword(data) {
  return REQUEST.post('/user/changePassword', data)
}

// 查询路由权限
export function getRouterList(data?) {
  return REQUEST.get('/tj/menu/getMenu', data)
}

// 更新路由权限
export function updateRouterList(data: { id: string; dwbm: string; menujson: any; userid: string }) {
  return REQUEST.post('/tj/menu/getMenu', data)
}
