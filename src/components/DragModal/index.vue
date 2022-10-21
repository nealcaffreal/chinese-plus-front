<template>
  <a-modal>
    <slot />
  </a-modal>
</template>

<script lang="ts">
import { computed, defineComponent, useAttrs, watchEffect } from 'vue'
import { drag, getStyle } from './helper'
import { useTimeoutFn } from '@/composables/core/useTimeout'

export default defineComponent({
  name: 'DragModal',
  setup() {
    const attrs = useAttrs()
    const visible = computed(() => {
      return attrs.visible
    })

    const handleDrag = () => {
      const dragWraps = document.querySelectorAll('.ant-modal-wrap')
      for (const wrap of Array.from(dragWraps)) {
        if (!wrap) continue
        const display = getStyle(wrap, 'display')
        const draggable = wrap.getAttribute('data-drag')
        if (display !== 'none' && draggable === null) {
          // 拖拽位置
          drag(wrap)
        }
      }
    }

    watchEffect(() => {
      if (visible.value) {
        useTimeoutFn(() => {
          handleDrag()
        }, 30)
      }
    })
  },
})
</script>
