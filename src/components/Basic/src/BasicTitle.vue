<template>
  <span class="basic-title" :class="[{ 'show-span': span && $slots.default }]">
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BasicTitle',
  props: {
    span: {
      type: Boolean,
    },
  },
})
</script>

<style lang="less" scoped>
.basic-title {
  position: relative;
  display: flex;
  font-size: 1rem;
  font-weight: 500;
  line-height: 24px;
  color: #1F3465;
  // cursor: pointer;
  user-select: none;
  white-space: nowrap;
  &.show-span {
    padding-left: 10px;
    &::before {
      position: absolute;
      top: 4px;
      left: 0;
      width: 4px;
      // height: 16px;
      .rem(height, 15);
      background: darken(@primary-color, 5);
      content: '';
    }
  }
}

html[data-theme="dark"] {
  .basic-title {
    color: #fff;
    &.show-span {
      &::before {
        background: @primary-5;
      }
    }
  }
}
</style>
