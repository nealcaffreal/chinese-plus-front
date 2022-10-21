<template>
  <a-list class="cs-notify-list" bordered :pagination="getPagination">
    <template v-for="item in getData" :key="item.id">
      <a-list-item class="cs-notify-list-item">
        <a-list-item-meta>
          <template #title>
            <a-typography-paragraph
              class="title"
              style="margin-bottom:0 !important;font-weight:normal"
              :style="{ cursor: isTitleClickable ? 'pointer' : '' }"
              :delete="!!item.titleDelete"
              :content="item.title"
              :ellipsis="$props.titleRows && $props.titleRows > 0
                ? { rows: $props.titleRows, tooltip: !!item.title }
                : false"
              @click="handleTitleClick(item)"
            />
          </template>

          <template #avatar>
            <a-avatar
              class="avatar"
              size="small"
              :src="item.type === 'article' ? '/images/article.png' : '/images/notification.png'"
            />
          </template>

          <template #description>
            <div v-if="item.description" class="description">
              <a-typography-paragraph
                style="margin-bottom:0 !important;color:#888"
                :content="item.description"
                :ellipsis="$props.descRows && $props.descRows > 0
                  ? { rows: $props.descRows, tooltip: !!item.description }
                  : false"
              />
            </div>
            <div class="datetime">
              {{ item.datetime }}
            </div>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref, watch } from 'vue'
import type { ListItem } from './types'
import { isNumber } from '@/utils/is'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ListItem[]>,
      default: () => [],
    },
    pageSize: {
      type: [Boolean, Number] as PropType<Boolean | Number>,
      default: 5,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    titleRows: {
      type: Number,
      default: 1,
    },
    descRows: {
      type: Number,
      default: 2,
    },
    onTitleClick: {
      type: Function as PropType<(Recordable) => void>,
    },
  },
  emits: ['update:currentPage'],
  setup(props, { emit }) {
    const current = ref(props.currentPage || 1)
    const getData = computed(() => {
      const { pageSize, list } = props
      if (pageSize === false) return []
      const size = isNumber(pageSize) ? pageSize : 5
      return list.slice(size * (unref(current) - 1), size * unref(current))
    })
    watch(
      () => props.currentPage,
      (v) => {
        current.value = v
      },
    )
    const isTitleClickable = computed(() => !!props.onTitleClick)
    const getPagination = computed(() => {
      const { list, pageSize } = props
      if (pageSize > 0 && list && list.length > pageSize) {
        return {
          total: list.length,
          pageSize,
          size: 'small',
          current: unref(current),
          onChange(page) {
            current.value = page
            emit('update:currentPage', page)
          },
        }
      }
      else {
        return false
      }
    })

    function handleTitleClick(item: ListItem) {
      props.onTitleClick && props.onTitleClick(item)
    }

    return {
      getPagination,
      getData,
      handleTitleClick,
      isTitleClickable,
    }
  },
})
</script>

<style lang="less" scoped>
.cs-notify-list {
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  ::v-deep(.ant-pagination-disabled) {
    display: inline-block !important;
  }

  .cs-notify-list-item {
    padding: 6px;
    overflow: hidden;
    transition: all 0.2s;
    .title {
      // font-weight: normal;
      margin-bottom:0 !important;
      &:hover {
        color: @primary-4;
      }
    }
    .avatar {
      margin-top: 3px;
    }
    .description {
      font-size: 12px;
      line-height: 14px;
    }
    .datetime {
      margin-top: 4px;
      font-size: 12px;
      line-height: 14px;
    }
  }
}
</style>
