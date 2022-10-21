import type { Ref } from 'vue'
import { inject, provide, readonly, ref } from 'vue'

/**
 * @description: 提供给子组件的 provide
 * @param {Ref} gap 子元素的间隔
 * @return {*}
 */
export function useGapProvide(gap: Ref<number>) {
  provide<Ref<number>>('gap', readonly(gap))
}

/**
 * @description: inject，获取父组件的间距
 * @param {*}
 * @return {*} gap 父类提供的间隔距离，只读响应式
 */
export function useGapInject() {
  return {
    gap: inject<Ref<number>>('gap', readonly(ref(10))),
  }
}
