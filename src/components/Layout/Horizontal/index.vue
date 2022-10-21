<template>
  <div ref="root" class="layout-h flex flex-1 w-full overflow-auto h-full">
    <slot :width="width" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, provide, ref, toRef } from 'vue'
import { useGapProvide } from '../composables/useGap'
import useSize from '../composables/useSize'

export default defineComponent({
  name: 'LayoutH',
  props: {
    gap: {
      type: Number,
      default: 10,
    },
  },
  setup(props) {
    useGapProvide(toRef(props, 'gap'))
    const firstEl = ref<Element | null>(document.createElement('div'))

    const { root, width } = useSize(() => {
      firstEl.value = root.value.firstElementChild
    })
    const setFlex = inject<() => void>('setFlex', () => {})
    setFlex()

    provide('firstEl', firstEl)
    return {
      root,
      width,
    }
  },
})
</script>
