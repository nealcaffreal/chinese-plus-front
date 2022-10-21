<template>
  <div ref="root" class="layout-h-item overflow-auto" :class="[flexClass, { 'flex-1': rest }]" :style="style">
    <slot :width="width" :height="height" />
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { computed, defineComponent, inject, ref } from 'vue'
import { useGapInject } from '../composables/useGap'
import useSize from '../composables/useSize'

interface Style {
  marginLeft?: string
}
export default defineComponent({
  name: 'LayoutHItem',
  provide() {
    return {
      setFlex: this.setFlex,
    }
  },
  props: {
    rest: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { gap } = useGapInject()
    const { root, width, height } = useSize()

    const firstEl = inject<Ref<Element | null>>('firstEl', ref(null))
    const isFirst = computed(() => firstEl.value === root.value || !root.value.previousElementSibling)

    return {
      gap,
      root,
      width,
      height,
      isFirst,
    }
  },
  data() {
    return {
      flexClass: '',
    }
  },
  computed: {
    style(): Style {
      const obj: Style = {}
      if (!this.isFirst)
        obj.marginLeft = `${this.gap}px`

      return obj
    },
  },
  methods: {
    setFlex() {
      this.flexClass = 'flex'
    },
  },
})
</script>

<style lang="less" scoped>
  .layout-h-item {
    > :deep(.ant-spin-nested-loading) {
      display: flex;
      flex-direction: column;
      flex: 1 1 0%;
      > .ant-spin-container {
        display: flex;
        flex: 1 1 0%;
        overflow: auto;
      }
      .ant-empty {
        flex: 1 1 0%;
      }
    }
  }
</style>
