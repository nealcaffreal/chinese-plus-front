<template>
  <i class="animate-icon" :style="bgStyle" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  img: {
    type: String,
    default: 'user-face.png',
  },
})

const bgStyle = computed<object>(() => {
  return {
    'background-image': `url('/images/animate-icons/${props.img}')`,
  }
})
</script>

<style lang="less">
.animate-icon {
  display: block;
  cursor: pointer;
  width: 60px;
  height: 60px;
  // background-image: url('/images/animate-icons/user-face.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: top center;
  animation: animate-icon-leave .3s steps(16) forwards;
  &:hover {
    animation: animate-icon-enter .3s steps(16) forwards;
  }
}

@keyframes animate-icon-enter {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 -960px;
  }
}

@keyframes animate-icon-leave {
  0% {
    background-position: 0 -960px;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
