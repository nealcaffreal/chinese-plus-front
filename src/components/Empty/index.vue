<template>
  <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE">
    <template #description>
      <slot name="description">
        暂无数据
      </slot>
    </template>
  </a-empty>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Empty } from 'ant-design-vue'

export default defineComponent({
  name: 'ZjEmpty',
  setup() {
    return {
      Empty,
    }
  },
})
</script>
