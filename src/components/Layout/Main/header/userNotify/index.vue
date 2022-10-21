<template>
  <a-popover trigger="click" overlay-class-name="cs-notify__overlay">
    <a>
      <a-badge :count="count" size="small">
        <a-avatar src="/images/avatar-m.png" />
      </a-badge>
    </a>
    <template #content>
      <a-tabs :animated="false" :tab-bar-style="{ 'text-align': 'center', 'margin-bottom': '10px' }">
        <template v-for="item in listData" :key="item.key">
          <a-tab-pane>
            <template #tab>
              {{ item.name }}
              <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
            </template>
            <!-- 绑定title-click事件的通知列表中标题是“可点击”的 -->
            <NoticeList v-if="item.key === '1'" :list="item.list" @title-click="onNoticeClick" />
            <NoticeList v-else :list="item.list" />
          </a-tab-pane>
        </template>
      </a-tabs>
    </template>
  </a-popover>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { ListItem } from './types.d'
import { tabListData } from './types.d'
import NoticeList from './NoticeList.vue'

const listData = ref(tabListData)

const count = computed(() => {
  let num = 0
  for (let i = 0; i < tabListData.length; i++)
    num += tabListData[i].list.length

  return num
})

const onNoticeClick = (record: ListItem) => {
  // 标记为已读（为标题添加删除线）
  record.titleDelete = !record.titleDelete
}
</script>
