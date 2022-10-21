import { REQUEST } from '@/api/base'

// 获取小组件布局数据
export function getWidgetsData(params) {
  return REQUEST.get('/lims/home/list', params)
}

// 保存小组件布局数据
export function saveWidgetsData(data) {
  return REQUEST.post('/lims/home/create', data)
}

// 恢复默认布局数据
export function restoreWidgetsData(data) {
  return REQUEST.post('/lims/home/recoverDefault', data)
}

