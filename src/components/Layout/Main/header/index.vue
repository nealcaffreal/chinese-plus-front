<template>
  <section class="app-header flex flex-none items-center justify-center relative">
    <div class="text-white text-xl flex items-center ml-4 h-full absolute left-0">
      <img src="/images/logo.png" class="h-12 mr-2">
      <span class="app-title whitespace-pre">{{ appTitle }}</span>
      <div class="app-version rounded-md italic px-2">
        {{ appVersion }}
      </div>
    </div>

    <!-- 功能根菜单 -->
    <RootMenu />

    <div class="flex items-center text-white h-full absolute right-0">
      <!-- 菜单搜索 -->
      <MenuSearch />
      <!-- 全屏 -->
      <FullscreenToggle />
      <!-- 通知 -->
      <UserNotify class="ml-4" />
      <!-- 用户下拉 -->
      <UserDropdown :user-info="userInfo" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import RootMenu from './rootMenu/index.vue'
import MenuSearch from './menuSearch/index.vue'
import UserNotify from './userNotify/index.vue'
import UserDropdown from './userDropdown/index.vue'
import FullscreenToggle from '@/components/FullscreenToggle'

const userInfo = {}
const appTitle = import.meta.env.VITE_APP_TITLE
const appVersion = import.meta.env.VITE_APP_VERSION
</script>

<style lang="less" scoped>
.app-header {
  background: @primary-color;
  .rem(height, 56);
  .rem(line-height, 56);
  .app-version {
    .rem(font-size, 12);
    background: @primary-5;
    position: absolute;
    .rem(right, -50);
    .rem(top, 10);
    .rem(line-height, 20);
  }
}

html[data-theme="dark"] {
  .app-header {
    background: @dark-bg-normal;
    .app-title {
      background: linear-gradient(90deg,#007CF0,#00DFD8);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .app-version {
      background: linear-gradient(90deg,#3b82f6 1.47%,#06b6d4);
    }
  }
}
</style>
