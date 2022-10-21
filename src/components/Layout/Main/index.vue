<template>
  <section class="app flex flex-col">
    <!-- 顶部区域 -->
    <MainHeader />
    <!-- 主区域 -->
    <div class="flex flex-col flex-auto overflow-auto">
      <SubMenu />
      <div class="flex flex-col flex-auto overflow-y-auto">
        <div class="app-main px-40 py-4 pb-2.5 flex flex-col overflow-y-auto" style="height:calc(100% - 22px)">
          <router-view />
        </div>
        <CsFooter />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue'
import MainHeader from './header/index.vue'
import SubMenu from './header/subMenu/index.vue'
import CsFooter from './footer/index.vue'

// 提供一个注入，支持某些页面自主设置 title
const title = ref('')
provide('title', title)
</script>

<style lang="less" scoped>
.app {
  height: 100vh;
  min-width: 1200px;
  background: #eef0f5;
  .app-main {
    background-size: cover;
  }
}

html[data-theme="dark"] {
  .app {
    background: @dark-bg-normal;
  }
}
</style>
