<template>
  <div ref="root" class="layout-v flex flex-col flex-1 w-full overflow-hidden h-full">
    <slot :height="height" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, toRef } from 'vue'
import { useGapProvide } from '../composables/useGap'
import useSize from '../composables/useSize'

export default defineComponent({
  name: 'LayoutV',
  props: {
    gap: {
      type: Number,
      default: 10,
    },
  },
  setup(props) {
    useGapProvide(toRef(props, 'gap'))
    const { root, height } = useSize()
    const setFlex = inject<() => void>('setFlex', () => {})
    setFlex()

    return {
      root,
      height,
    }
  },
})
</script>
