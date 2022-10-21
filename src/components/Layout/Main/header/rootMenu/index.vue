<template>
  <nav class="text-white flex items-center h-full nav-wrap">
    <div
      v-for="menu in menus"
      :key="menu.name"
      class="nav-item flex items-center"
      :class="{ active: menu.name === rootMenuKey }"
      @click="handleClick(menu)"
    >
      <icon-svg :type="menu?.meta?.icon" class="mr-2" />
      {{ menu?.meta?.title }}
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMenu } from '../../composables/useMenu'

export default defineComponent({
  setup() {
    const { menus, rootMenuKey, handleClick } = useMenu()

    return {
      menus,
      rootMenuKey,
      handleClick,
    }
  },
})
</script>

<style scoped lang="less">
.nav-wrap {
  font-size: 1.1rem;
  .nav-item {
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &:hover {
      background: @primary-5;
    }
    &.active {
      font-weight: bold;
      background: @primary-5;
    }
    transition: all .2s;
  }
}

html[data-theme="dark"] {
  .nav-wrap {
    .nav-item:hover, .nav-item.active {
      background: @dark-bg-light-1;
    }
  }
}
</style>
