<template>
  <div v-if="info?.list?.length" class="wrap">
    <div class="title mb-5">
      {{ info.title }}
    </div>
    <div v-for="(item, index) in info.list" :key="index" class="flex justify-between items-center line">
      <span class="flex items-center">
        <icon-svg type="color-log" style="font-size:26px;flex:none" />
        <span class="ml-2 name">{{ item.name }}</span>
      </span>
      <span class="date">{{ item.date }}</span>
    </div>
  </div>
  <div v-else class="flex justify-center items-center w-full h-full">
    <cs-empty description="暂无数据" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ListShow',
  // props: {
  //   list: {
  //     type: Array,
  //     default: () => []
  //   }
  // },
  setup() {
    return {
      info: {
        title: '水质检测COD（需氧量）的标准',
        list: [
          { name: '水质 化学需氧量的测定 快速消解分光光度法（HJ_T 399-2007）', date: '2007' },
          { name: '水质 化学需氧量的测定 重铬酸盐法(HJ 828—2017代替GB 11914-89)', date: '2017' },
          { name: '水质 化学需氧量的测定 快速消解分光光度法（HJ_T 399-2008）', date: '2018' },
        ],
      },
    }
  },
})
</script>

<style scoped lang="less">
@import url('@/styles/global.less');
.wrap {
  .title {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }
  .line {
    margin: 10px 0;
    .name {
      cursor: pointer;
      font-size: 20px;
      &:hover {
        color: @primary-color;
      }
    }
    .date {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
