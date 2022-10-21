<template>
  <span>{{ value }}</span>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, unref, watch, watchEffect } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { isNumber } from '@/utils/is'

const props = defineProps({
  startVal: { type: [Number, String], default: 0 },
  endVal: { type: [Number, String], default: 2022 },
  duration: { type: Number, default: 1000 },
  autoplay: { type: Boolean, default: true },
  decimals: {
    type: Number,
    default: 0,
    validator(value: number) {
      return value >= 0
    },
  },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  separator: { type: String, default: ',' },
  decimal: { type: String, default: '.' },
  // 动画
  useEasing: { type: Boolean, default: true },
  transition: { type: String, default: 'linear' },
})
const emit = defineEmits(['onStarted', 'onFinished'])

const source = ref(Number(props.startVal))
const disabled = ref(false)
let outputValue = useTransition(source)

const value = computed(() => formatNumber(unref(outputValue)))

watchEffect(() => {
  source.value = Number(props.startVal)
})

watch([() => props.startVal, () => props.endVal], () => {
  if (props.autoplay)
    start()
})

onMounted(() => {
  props.autoplay && start()
})

function start() {
  run()
  source.value = Number(props.endVal)
}

// function reset() {
//   source.value = props.startVal
//   run()
// }

function run() {
  outputValue = useTransition(source, {
    disabled,
    duration: props.duration,
    onFinished: () => emit('onFinished'),
    onStarted: () => emit('onStarted'),
    ...(props.useEasing ? { transition: TransitionPresets[props.transition] } : {}),
  })
}

function formatNumber(num: number | string) {
  if (!num && num !== 0)
    return ''

  const { decimals, decimal, separator, suffix, prefix } = props
  num = Number(num).toFixed(decimals)
  num += ''

  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? decimal + x[1] : ''

  const rgx = /(\d+)(\d{3})/
  if (separator && !isNumber(separator)) {
    while (rgx.test(x1))
      x1 = x1.replace(rgx, `$1${separator}$2`)
  }
  return prefix + x1 + x2 + suffix
}
</script>
