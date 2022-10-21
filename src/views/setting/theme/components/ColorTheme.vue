<template>
  <section class="color-theme-wrap">
    <div
      v-for="colorPrimary in labColorList"
      :key="colorPrimary.value"
      class="color-single-outer"
      :class="[
        { active: colorPrimary.value === labColor },
        isDark ? 'cursor-not-allowed' : 'cursor-pointer',
      ]"
      @click="setLabColor(colorPrimary.value)"
    >
      <div class="color-single-inner">
        <div
          v-for="item in getColorBlocks(colorPrimary.value)"
          :key="item"
          :style="`background-color:${item}`"
          class="color-block"
        />
      </div>
      <div class="color-title">
        {{ colorPrimary.label }}
      </div>
    </div>
  </section>

  <section class="mt-6">
    <basic-title span class="flex items-center">
      灰色模式：
      <a-switch v-model:checked="isGrayMode" checked-children="开" un-checked-children="关" />
    </basic-title>
  </section>
</template>

<script lang="ts" setup>
import { useDarkTheme, useGrayMode, useLabColor } from '@/composables/web/useTheme'

const { labColorList, setLabColor, labColor, generateColor } = useLabColor()
const { isDark } = useDarkTheme()
const { isGrayMode } = useGrayMode()
console.log(isDark.value)
const getColorBlocks = (color: string) => {
  const list = generateColor(color)
  return list.slice(3, 7)
}
</script>

<style lang="less" scoped>
.color-theme-wrap {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 5rem);
  gap: 20px;

  .color-single-outer {
    .rem(width, 80);
    padding: 10px 10px 4px;
    border-radius: 4px;
    transition: transform .2s cubic-bezier(.38,0,.24,1);
    .color-single-inner {
      .color-block {
        .rem(height, 16);
        &:first-child {
          border-radius: 4px 4px 0 0;
        }
        &:last-child {
          border-radius: 0 0 4px 4px;
        }
      }
    }
    .color-title {
      text-align: center;
    }
  }

  .color-single-outer:hover {
    transform: translateY(-4px);
  }
  .color-single-outer.active {
    background-color: #efefef;
    .color-title {
      color: @primary-color;
    }
  }
}

html[data-theme="dark"] {
  .color-theme-wrap {
    .color-single-outer.active {
      background-color: @dark-bg-light-1;
      .color-title {
        color: @primary-5;
      }
    }
  }
}
</style>
