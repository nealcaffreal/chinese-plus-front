import { nextTick, ref, unref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'
import { menus } from '@/router/menus'
import { useGo } from '@/composables/web/usePage'

export interface SearchResult {
  title: string | undefined
  name: string | undefined
  icon?: string
}

function filter<T = any>(menus: T[], func: (n: T) => boolean): T[] {
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node.children = node.children && listFilter(node.children)
        return func(node) || (node.children && node.children.length)
      })
  }
  return listFilter(menus)
}

// 转义特殊字符
function transform(c: string) {
  const code: string[] = ['$', '(', ')', '*', '+', '.', '[', ']', '?', '\\', '^', '{', '}', '|']
  return code.includes(c) ? `\\${c}` : c
}

// 创建搜索正则，模糊搜索，例如：关键词【数义】可以匹配到【xxx数据定义】
function createSearchReg(key: string) {
  const keys = [...key].map(item => transform(item))
  const str = ['', ...keys, ''].join('.*')
  return new RegExp(str)
}

// 菜单搜索组合式 API
export function useMenuSearch(emit: EmitType) {
  const searchResult = ref<SearchResult[]>([])
  const keyword = ref('')
  const activeIndex = ref(-1)

  function search(e: ChangeEvent) {
    e?.stopPropagation()
    const key = e.target.value
    keyword.value = key.trim()
    if (!key) {
      searchResult.value = []
      return
    }
    const reg = createSearchReg(unref(keyword))
    const filterMenu = filter(menus, (item) => {
      return reg.test(item?.meta?.title as string)
    })
    searchResult.value = handlerSearchResult(filterMenu, reg)
    activeIndex.value = 0
  }

  const handleSearch = useDebounceFn(search, 200)

  function handlerSearchResult(filterMenu: RouteRecordRaw[], reg: RegExp, parent?: RouteRecordRaw) {
    const ret: SearchResult[] = []
    filterMenu.forEach((item) => {
      const { meta, name, children } = item
      if (
        !meta?.notShow
        && reg.test(meta?.title as string)
        && !children?.length
      ) {
        const parentTitle = parent?.meta?.title as string
        const title = meta?.title as string
        const parentIcon = parent?.meta?.icon as string
        const icon = meta?.icon as string
        ret.push({
          title: parentTitle ? `${parentTitle} / ${title}` : title,
          name: name as string,
          icon: parentIcon || icon,
        })
      }
      if (children?.length)
        ret.push(...handlerSearchResult(children, reg, item))
    })
    return ret
  }

  // 鼠标进入
  function handleMouseenter(e: any) {
    const index = e.target.dataset.index
    activeIndex.value = Number(index)
  }

  // 键盘-上方向键
  function handleMouseUp() {
    if (!searchResult.value.length) return
    activeIndex.value--
    if (activeIndex.value < 0)
      activeIndex.value = searchResult.value.length - 1
  }

  // 键盘-下方向键
  function handleMouseDown() {
    if (!searchResult.value.length) return
    activeIndex.value++
    if (activeIndex.value > searchResult.value.length - 1)
      activeIndex.value = 0
  }

  // 键盘回车事件（包含了点击事件）
  const go = useGo()
  async function handleSelect() {
    if (!searchResult.value.length)
      return

    const result = unref(searchResult)
    const index = unref(activeIndex)
    if (result.length === 0 || index < 0)
      return

    const to = result[index]
    handleClose()
    await nextTick()
    go(to.name)
  }

  // 关闭 modal
  function handleClose() {
    searchResult.value = []
    emit('close')
  }

  // 键盘-上
  onKeyStroke('ArrowUp', handleMouseUp)
  // 键盘-下
  onKeyStroke('ArrowDown', handleMouseDown)
  // 键盘-回车
  onKeyStroke('Enter', handleSelect)
  // 键盘-Esc
  onKeyStroke('Escape', handleClose)

  return {
    handleSearch,
    searchResult,
    keyword,
    activeIndex,
    handleMouseenter,
    handleSelect,
  }
}
