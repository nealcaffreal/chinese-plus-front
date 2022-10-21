import type { Ref } from 'vue'
import { inject, ref, watch } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { menus } from '@/router/menus'

export const useMenu = () => {
  const route = useRoute()
  const router = useRouter()

  // 通过依赖注入获取的 title，配合不同页面自定义，展示不同的 title
  const customTitle = inject<Ref<string>>('title', ref(''))

  // 菜单相关 - START
  const menuKey = ref<string>('')
  const rootMenuKey = ref<string>('')
  const breadcrumbList = ref<string[]>([])

  function handleClick(route: RouteRecordRaw) {
    router.push({ name: route.name })
  }

  // 生成面包屑
  const getBreadcrumbList = (key: string) => {
    const arr: string[] = []
    const menu = menus.find((item) => {
      return item.name === key
        || item.children?.some(i => i.name === key)
    },
    )
    if (menu) {
      arr.push(menu?.meta?.title as string)
      const menuItem = menu?.children?.find(item => item.name === key)
      if (menuItem)
        arr.push(menuItem?.meta?.title as string)

      if (customTitle.value)
        arr.push(customTitle.value)
    }
    return arr
  }

  watch(() => route.name, (key: string) => {
    menuKey.value = route.meta?.activedMenu
      ? route.meta?.activedMenu as string
      : key
    if (route.matched?.[1])
      rootMenuKey.value = route.matched[1].name as string

    breadcrumbList.value = getBreadcrumbList(key)
  }, { immediate: true })
  // 菜单相关 - END

  // document.title
  const setTitle = () => {
    const pageTitle = customTitle.value || breadcrumbList.value[breadcrumbList.value.length - 1] || ''
    if (pageTitle)
      document.title = `${pageTitle} - ${import.meta.env.VITE_APP_ABBR}`
  }
  watch(route, () => {
    // 每次切换路由时初始化自定义标题为空
    customTitle.value = ''
    setTitle()
  }, { immediate: true })

  watch(customTitle, (val) => {
    if (val)
      setTitle()
  })

  return {
    menus,
    rootMenuKey,
    menuKey,
    handleClick,
    breadcrumbList,
  }
}
