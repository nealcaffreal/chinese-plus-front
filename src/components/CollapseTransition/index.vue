<template>
  <Transition v-on="transitionProps">
    <slot />
  </Transition>
</template>

<script lang="ts" setup>
const transitionStyle = '.1s height ease-in-out'
const transitionProps = {
  beforeEnter(el) {
    el.style.transition = transitionStyle
    if (!el.dataset) el.dataset = {}
    el.style.height = 0
  },
  enter(el) {
    if (el.scrollHeight !== 0)
      el.style.height = `${el.scrollHeight}px`
    else
      el.style.height = ''

    el.style.overflow = 'hidden'
  },
  afterEnter(el) {
    el.style.transition = ''
    el.style.height = ''
  },
  beforeLeave(el) {
    if (!el.dataset) el.dataset = {}
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    if (el.scrollHeight !== 0) {
      el.style.transition = transitionStyle
      el.style.height = 0
    }
  },
  afterLeave(el) {
    el.style.transition = ''
    el.style.height = ''
  },
}
</script>
