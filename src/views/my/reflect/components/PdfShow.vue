<template>
  <object v-if="srcFile" :data="srcFile" type="application/pdf" width="100%" height="100%">
    <iframe :src="srcFile" width="100%" height="100%" style="border:none">
      您的浏览器不支持显示 PDF 文件，请下载后查看：<a :href="srcFile">下载 PDF</a>
    </iframe>
  </object>
  <div v-else class="flex justify-center items-center w-full h-full">
    <cs-empty description="暂无文档" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PdfShow',
  props: {
    srcFile: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {}
  },
})
</script>
