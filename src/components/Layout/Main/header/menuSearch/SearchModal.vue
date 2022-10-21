<template>
  <Teleport to="body">
    <div v-if="visible" class="search-modal">
      <div v-click-outside="handleClose" class="content">
        <div class="input-wrapper">
          <a-input
            ref="inputRef"
            class="input"
            placeholder="菜单搜索"
            allow-clear
            @change="handleSearch"
          >
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
        </div>

        <ul v-show="hasData" class="list">
          <li
            v-for="(item, index) in searchResult"
            :key="item.name"
            :data-index="index"
            class="list-item" :class="[{ 'list-item-active': activeIndex === index }]"
            @mouseenter="handleMouseenter"
            @click="handleSelect"
          >
            <div class="list-item-icon">
              <icon-svg :type="item.icon || 'menu-default'" style="font-size:16px" />
            </div>
            <div class="list-item-text">
              {{ item.title }}
            </div>
            <div class="list-item-enter">
              <icon-svg type="enter" style="font-size:16px" />
            </div>
          </li>
        </ul>

        <a-empty v-show="!hasData" :image="Empty.PRESENTED_IMAGE_SIMPLE">
          <template #description>
            <div class="footer">
              快捷键：<code>Ctrl + k</code>&nbsp;唤起本窗口，<code>Esc</code>&nbsp;关闭
            </div>
          </template>
        </a-empty>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, unref, watch } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { Empty } from 'ant-design-vue'
import { useMenuSearch } from './useMenuSearch'
import clickOutside from '@/directives/clickOutside'

export default defineComponent({
  components: { SearchOutlined },
  directives: { clickOutside },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const inputRef = ref<Nullable<HTMLElement>>(null)

    const {
      handleSearch,
      searchResult,
      keyword,
      activeIndex,
      handleSelect,
      handleMouseenter,
    } = useMenuSearch(emit)

    const hasData = computed(() => keyword && unref(searchResult).length > 0)

    const handleClose = () => {
      searchResult.value = []
      emit('close')
    }

    // input 自动聚焦
    watch(() => props.visible, (visible: boolean) => {
      visible && nextTick(() => {
        unref(inputRef)?.focus()
      })
    })

    return {
      inputRef,
      handleSearch,
      searchResult,
      activeIndex,
      handleSelect,
      handleMouseenter,
      hasData,
      Empty,
      handleClose,
    }
  },
})
</script>

<style lang="less" scoped>
.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, .3);

  .content {
    position: relative;
    .rem(width, 540);
    margin: 0 auto auto;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 20px 60px -14px rgba(0, 0, 0, .3);
  }

  .input-wrapper {
    padding: 16px 16px 0;
    .input {
      width: 100%;
      .rem(height, 47);
      .rem(font-size, 18);
      color: #111;
      border-radius: 4px;
      span[role='img'] {
        color: #999;
      }
      :deep(input.ant-input) {
        .rem(font-size, 17);
      }
    }
  }

  .list {
    .rem(max-height, 440);
    .rem(margin-top, 12);
    padding: 0 16px 20px;
    overflow: auto;
    .list-item {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      .rem(height, 46);
      padding-left: 14px;
      margin-top: 10px;
      cursor: pointer;
      background-color: #fff;
      border-radius: 2px;
      border: 1px solid #efefef;
      .list-item-icon {
        display: flex;
        align-items: center;
        width: 30px;
      }
      .list-item-text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .list-item-enter {
        display: flex;
        align-items: center;
        width: 30px;
        opacity: 0%;
      }
    }
    .list-item-active {
      color: #fff;
      background-color: @primary-color;
      .list-item-enter {
        opacity: 100%;
      }
    }
  }

  .ant-empty .footer {
    margin-top: 20px;
    code {
      padding: 2px 7px;
      border-radius: 3px;
      background-color: #eee;
      color: #a1aab2;
    }
  }
}

html[data-theme="dark"] {
  .search-modal {
    .content {
      background-color: @dark-bg-normal;
      box-shadow: 0 20px 60px -14px rgba(0, 0, 0, .3);
    }

    .input-wrapper {
      .input {
        color: #111;
        span[role='img'] {
          color: #999;
        }
      }
    }

    .list {
      .list-item {
        background-color: @dark-bg-light;
        border: 1px solid @dark-border;
      }
      .list-item-active {
        background-color: @dark-bg-light-1;
      }
    }

    .ant-empty .footer {
      code {
        background-color: @dark-bg-light-1;
        color: #a1aab2;
      }
    }
  }
}
</style>
