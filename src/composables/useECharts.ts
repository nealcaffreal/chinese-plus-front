import { tryOnUnmounted } from '@vueuse/core'
import type { Ref } from 'vue'
import { nextTick, shallowRef, unref, watchEffect } from 'vue'
import type { EChartsOption } from 'echarts'
import { useTimeoutFn } from '@/composables/core/useTimeout'
import { useDebounce } from '@/composables/core/useDebounce'
import { useEventListener } from '@/composables/event/useEventListener'
import { useBreakpoint } from '@/composables/event/useBreakpoint'

import echarts from '@/plugins/echarts'

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'light',
) {
  const chartInstance = shallowRef<echarts.ECharts | null>(null)
  let resizeFn: Fn = resize
  let removeResizeFn: Fn = () => {}

  const [debounceResize] = useDebounce(resize, 200)
  resizeFn = debounceResize

  function initCharts() {
    const el = unref(elRef)
    if (!el || !unref(el))
      return

    chartInstance.value = echarts.init(el, theme)
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    })
    removeResizeFn = removeEvent
    const { widthRef, screenEnum } = useBreakpoint()
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn()
      }, 30)
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(options)
      }, 30)
      return
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance.value) {
          initCharts()

          if (!chartInstance.value) return
        }
        clear && chartInstance.value?.clear()

        chartInstance.value?.setOption(options)
      }, 30)
    })
  }

  function resize() {
    useTimeoutFn(() => {
      chartInstance.value?.resize()
    }, 30)
  }

  tryOnUnmounted(() => {
    if (!chartInstance.value) return
    removeResizeFn()
    chartInstance.value.dispose()
    chartInstance.value = null
  })

  // 元素变化时 resize
  const resizeObserve = new ResizeObserver(() => {
    useTimeoutFn(() => {
      chartInstance.value?.resize()
    }, 30)
  })
  watchEffect(() => {
    if (elRef.value && elRef.value.parentElement)
      resizeObserve.observe(elRef.value.parentElement)
  })

  return {
    setOptions,
    resize: resizeFn,
    echarts,
    chartInstance,
  }
}
