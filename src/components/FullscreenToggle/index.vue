<template>
  <span
    :title="isFullscreen ? '退出全屏' : '进入全屏'"
    class="mx-2 icon flex items-center"
    @click="toggle"
  >
    <icon-svg v-if="isFullscreen" type="fullscreen-exit" />
    <icon-svg v-else type="fullscreen-enter" />
  </span>
</template>

<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>

<style lang="less" scoped>
.icon {
  cursor: pointer;
  .svg-icon {
    font-size: 16px;
  }
}
</style>
