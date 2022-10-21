import { tryOnMounted, useDark, useStorage } from '@vueuse/core'
import { generate } from '@ant-design/colors'
import { watch } from 'vue'
import { changeTheme, loadDarkTheme } from '@/utils/theme'
import { toggleClass } from '@/utils/domUtils'

const themeStorageKey = 'LAB_THEME'
const graymodeStorageKey = 'LAB_GRAYMODE'
const colorStorageKey = 'LAB_COLOR'

/**
 * dark 主题切换
 */
// 初始化 localStorage 为 light
useStorage(themeStorageKey, 'light')
const isDark = useDark({
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: themeStorageKey,
})
export function useDarkTheme() {
  const toggleDark = async () => {
    isDark.value = !isDark.value
    if (isDark.value)
      await loadDarkTheme()
  }

  tryOnMounted(loadDarkTheme)

  return {
    isDark,
    toggleDark,
  }
}

/**
 * 灰色模式
 */
const isGrayMode = useStorage(graymodeStorageKey, false)
export function useGrayMode() {
  watch(isGrayMode, () => {
    toggleClass(isGrayMode.value, 'gray-mode', document.documentElement)
  }, { immediate: true })

  return {
    isGrayMode,
  }
}

/**
 * light 模式时的主题颜色切换
 */
interface LabColorItem {
  label: string
  value: string
}
const labColorList: LabColorItem[] = [
  { label: '默认', value: '#6366f1' },
  { label: '火山红', value: '#e34d59' },
  { label: '日暮橙', value: '#ed7b2f' },
  { label: '金盏黄', value: '#ebb105' },
  { label: '极光绿', value: '#00a870' },
  { label: '薄荷青', value: '#13c2c2' },
  { label: '拂晓蓝', value: '#0594fa' },
  { label: '极客蓝', value: '#0052d9' },
  { label: '木槿紫', value: '#834ec2' },
  { label: '星光粉', value: '#ed49b4' },
]

const labColor: any = useStorage(colorStorageKey, '')
labColor.value && changeTheme(labColor.value)

export function useLabColor() {
  const setLabColor = (color: any) => {
    if (isDark.value) return

    if (labColor.value !== color) {
      labColor.value = color || labColorList[0].value
      changeTheme(color)
    }
  }

  return {
    labColorList,
    setLabColor,
    labColor,
    generateColor: generate,
  }
}
