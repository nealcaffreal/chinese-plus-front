<template>
  <div
    v-if="subMenuList.length > 0"
    class="submenu-wrap flex items-center justify-center relative"
  >
    <nav class="flex items-center justify-center">
      <template v-for="submenu in subMenuList" :key="submenu.name">
        <div
          v-if="!submenu.meta.notShow"
          class="item" :class="[{ active: submenu.name === menuKey || submenu.children?.some(item => item.name === menuKey) }]"
          @click="handleClick(submenu)"
        >
          {{ submenu.meta?.title || '' }}
        </div>
      </template>
    </nav>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useMenu } from '../../composables/useMenu'

export default defineComponent({
  setup() {
    const { menus, rootMenuKey, menuKey, handleClick } = useMenu()

    const subMenuList = computed<any[]>(() => {
      const menu = menus.find((item) => {
        return item.name === rootMenuKey.value
          || item.children?.some(i => i.name === rootMenuKey.value)
      },
      )
      return menu?.children || []
    })

    return {
      subMenuList,
      menuKey,
      handleClick,
    }
  },
})
</script>

<style scoped lang="less">
.submenu-wrap {
  background-color: #fff;
  padding: 0 1rem;
  box-shadow: 0 0 5px #dedede;
  z-index: 1;
  nav {
    height: 3.2rem;
    line-height: 3.2rem;
  }
  .item {
    height: 2.4rem;
    line-height: 2.4rem;
    color: @text-color;
    font-size: 1rem;
    cursor: pointer;
    padding: 0 .8rem;
    transition: all .2s;
    border-radius: 4px;
    &:hover {
      background-color: #f1f1f1;
    }
    &.active {
      color: @primary-color;
      font-weight: 600;
    }
  }
}

html[data-theme="dark"] {
  .submenu-wrap {
    background-color: @dark-bg-light;
    box-shadow: 0 10px 10px 0 rgb(0 0 0 / 10%);
    .item {
      color: @text-color-secondary-dark;
      &:hover {
        background-color: @dark-bg-light-1;
      }
      &.active {
        color: @primary-5;
      }
    }
  }
}
</style>
