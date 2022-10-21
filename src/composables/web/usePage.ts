import type { RouteLocationRaw, Router } from 'vue-router'
import { useRouter } from 'vue-router'
import { isString } from '@/utils/is'

function handleError(e: Error) {
  console.error(e)
}

// 页面切换
export function useGo(_router?: Router) {
  let router
  if (!_router)
    router = useRouter()

  const { push, replace } = _router || router
  function go(routerName = 'CaseInfo', isReplace = false) {
    if (!routerName)
      return

    if (isString(routerName)) {
      isReplace ? replace({ name: routerName }).catch(handleError) : push({ name: routerName }).catch(handleError)
    }
    else {
      const o = routerName as RouteLocationRaw
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError)
    }
  }
  return go
}
