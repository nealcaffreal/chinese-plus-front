import { REQUEST } from '@/api/base'

interface RightByGHParams {
  dwbm: string
}

interface RightByGHModel {
  dwbm: string
  id: string
  postid: string
  posttype: string
  resid: string
  righttype: string
  xh: number
}

// 事项管理-获取当前登录人事项审批权限
export function rightByGH(params: RightByGHParams) {
  return REQUEST.get<RightByGHModel[]>('/matterManage/rightByGH', params)
}
