<template>
  <a-descriptions v-if="info?.detail?.length" :title="info.title" :column="2" bordered size="small">
    <a-descriptions-item
      v-for="item in info.detail"
      :key="item.label"
      :label="item.label"
    >
      {{ item.value }}
    </a-descriptions-item>
  </a-descriptions>
  <div v-else class="flex justify-center items-center w-full h-full">
    <cs-empty description="暂无设备信息" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DetailShow',
  setup() {
    return {
      info: {
        title: 'xxx设备',
        detail: [
          { label: '型号', value: 'FLA-000' },
          { label: '厂商', value: 'xxx公司' },
          { label: '规格', value: 'XXXX' },
          { label: '用途', value: 'xxxxx' },
          { label: '责任人', value: '张三' },
          { label: '位置', value: 'xx楼xx层xx房间' },
        ],
      },
    }
  },
})
</script>
