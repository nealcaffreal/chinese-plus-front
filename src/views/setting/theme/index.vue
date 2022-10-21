<template>
  <layout-v>
    <layout-v-item class="with-bg px-5 py-4">
      <BasicTitle span>
        颜色主题（仅在亮色模式下生效）
      </BasicTitle>
      <ColorTheme />
    </layout-v-item>
  </layout-v>
</template>

<script lang="ts" setup>
import ColorTheme from './components/ColorTheme.vue'
import BasicTitle from '@/components/Basic/src/BasicTitle.vue'
</script>
