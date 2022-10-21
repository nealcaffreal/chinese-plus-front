<template>
  <div class="flex items-center menu-search" title="菜单搜索" @click="modalVisible = true">
    <SearchOutlined style="font-size:16px" />
    <SearchModal :visible="modalVisible" @close="modalVisible = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { useEventListener } from '@vueuse/core'
import SearchModal from './SearchModal.vue'

export default defineComponent({
  components: { SearchOutlined, SearchModal },
  setup() {
    const modalVisible = ref<boolean>(false)

    // 监听搜索快捷键: Ctrl + k
    useEventListener(document, 'keydown', (evt) => {
      if (evt.ctrlKey && evt.key === 'k')
        modalVisible.value = !modalVisible.value
    })

    return { modalVisible }
  },
})
</script>

<style scoped lang="less">
.menu-search {
  color: #fff;
  cursor: pointer;
  height: 100%;
  padding: 0 8px;
  transition: background-color .2s;
  &:hover {
    color: #fff;
    background-color: @primary-5;
  }
}

html[data-theme="dark"] {
  .menu-search:hover {
    background-color: @dark-bg-light-1;
  }
}
</style>
