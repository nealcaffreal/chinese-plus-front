<template>
  <div class="flex items-center justify-between px-4 h-6 cs-footer text-gray-400">
    <span>{{ new Date().getFullYear() }} &copy; {{ appCopyright }}</span>
    <span class="flex items-center">
      <span class="mr-6">今天是 {{ curDate }}</span>
      <ThemeToggle />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import ThemeToggle from '@/components/ThemeToggle'

export default defineComponent({
  components: { ThemeToggle },
  setup() {
    return {
      appCopyright: import.meta.env.VITE_APP_COPYRIGHT,
      curDate: dayjs().format('YYYY 年 M 月 D 日 dddd'),
    }
  },
})
</script>

<style scoped lang="less">
.cs-footer {
  background: #fff;
  z-index: 1;
  box-shadow: 0px 0px 5px #f1f2f4;
  .rem(font-size, 12)
}

html[data-theme="dark"] {
  .cs-footer {
    background: @dark-bg-light;
    box-shadow: 0px -10px 10px 0 rgb(0 0 0 / 10%);
  }
}
</style>
