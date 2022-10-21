<template>
  <div ref="root" class="layout-v-item overflow-auto" :class="[flexClass, { 'flex-1': rest }]" :style="style">
    <slot :height="height" :width="width" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useGapInject } from '../composables/useGap'
import useSize from '../composables/useSize'

interface Style {
  marginTop?: string
}

export default defineComponent({
  name: 'LayoutVItem',
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
    const { root, height, width } = useSize()
    const isFirst = ref<boolean>(true)
    watchEffect(() => {
      // isFirst.value = root.value.previousSibling?.childNodes.length === 0
      isFirst.value = !root.value.previousElementSibling
    })

    return {
      gap,
      root,
      height,
      isFirst,
      width,
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
        obj.marginTop = `${this.gap}px`

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
.layout-v-item {
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
