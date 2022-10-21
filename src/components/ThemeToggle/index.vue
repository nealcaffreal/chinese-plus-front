<template>
  <span class="ml-2 icon flex items-center" title="切换主题" @click="toggleDark">
    <icon-svg v-if="isDark" type="moon" />
    <icon-svg v-else type="sun" />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDarkTheme } from '@/composables/web/useTheme'

export default defineComponent({
  setup() {
    const { isDark, toggleDark } = useDarkTheme()

    return {
      isDark,
      toggleDark,
    }
  },
})
</script>

<style lang="less" scoped>
.icon {
  cursor: pointer;
  .svg-icon {
    font-size: 16px;
  }
}
</style>
