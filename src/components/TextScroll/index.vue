<template>
  <div>
    <div class="ts-wrap" :style="getCurrentStyle">
      <div class="transparent-overlay" />
      <div v-if="gradient" class="overlay" />
      <div class="ts-inner">
        <slot />
      </div>
      <div class="ts-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'TextScroll',
  props: {
    // 滚动方向，默认向左（即 normal）
    direction: {
      type: String as PropType<'normal' | 'reverse'>,
      default: 'normal',
    },
    // 间隔，单位：秒
    duration: {
      type: Number,
      default: 20,
    },
    // 延迟，单位：秒
    delay: {
      type: Number,
      default: 0,
    },
    // 循环次数，0 为无限
    loop: {
      type: Number,
      default: 0,
    },
    // 是否渐变
    gradient: {
      type: Boolean,
      default: false,
    },
    // 渐变颜色
    gradientColor: {
      type: Array as unknown as PropType<[number, number, number]>,
      default: () => [255, 255, 255],
    },
    // 渐变宽度
    gradientWidth: {
      type: String,
      default: '60px',
    },
    // 是否 hover 悬停
    pauseOnHover: {
      type: Boolean,
      default: true,
    },
    // 是否点击停止
    pauseOnClick: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const getCurrentStyle: any = computed(() => {
      return {
        '--duration': `${props.duration}s`,
        '--delay': `${props.delay}s`,
        '--direction': `${props.direction}`,
        '--pauseOnHover': `${props.pauseOnHover ? 'paused' : 'running'}`,
        '--pauseOnClick': `${props.pauseOnClick ? 'paused' : 'running'}`,
        '--loops': `${props.loop === 0 ? 'infinite' : props.loop}`,
        '--gradient-color': `rgba(${props.gradientColor[0]}, ${props.gradientColor[1]}, ${props.gradientColor[2]}, 1), rgba(${props.gradientColor[0]}, ${props.gradientColor[1]}, ${props.gradientColor[2]}, 0)`,
        '--gradient-width': `${props.gradientWidth}`,
      }
    })
    return {
      getCurrentStyle,
    }
  },
})
</script>

<style scoped lang="less">
.ts-wrap {
  overflow-x: hidden;
  display: flex;
  position: relative;
  width: 100%;
}

.ts-wrap:hover div {
  animation-play-state: var(--pauseOnHover);
}
.ts-wrap:active div {
  animation-play-state: var(--pauseOnClick);
}

.ts-inner {
  flex: 0 0 auto;
  min-width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--loops);
  animation-direction: var(--direction);
}

@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}

.transparent-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}

.overlay::before,
.overlay::after {
  // background: linear-gradient(to right, var(--gradient-color));
  background: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
}

.overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}

.overlay::before {
  left: 0;
  top: 0;
}

html[data-theme="dark"] {
  .overlay::before,
  .overlay::after {
    background: linear-gradient(to right, rgba(@dark-bg-light, 1), rgba(@dark-bg-light, 0));
  }
}
</style>
