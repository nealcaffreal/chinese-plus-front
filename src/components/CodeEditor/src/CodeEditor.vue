<template>
  <div class="h-full">
    <CodeMirrorEditor
      :value="getValue"
      :mode="mode"
      :readonly="readonly"
      @change="handleValueChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import CodeMirrorEditor from './codemirror/index.vue'
import { MODE } from './types'
import { isString } from '@/utils/is'

const props = defineProps({
  value: { type: [Object, String] as PropType<Record<string, any> | string> },
  mode: {
    type: String as PropType<MODE>,
    default: MODE.JSON,
    validator(value: any) {
      return Object.values(MODE).includes(value)
    },
  },
  readonly: { type: Boolean },
  autoFormat: { type: Boolean, default: true },
})

const emit = defineEmits(['change', 'update:value', 'formatError'])

const getValue = computed(() => {
  const { value, mode, autoFormat } = props
  if (!autoFormat || mode !== MODE.JSON)
    return value as string

  let result = value
  if (isString(value)) {
    try {
      result = JSON.parse(value)
    }
    catch (e) {
      emit('formatError', value)
      return value as string
    }
  }
  return JSON.stringify(result, null)
})

function handleValueChange(v) {
  emit('update:value', v)
  emit('change', v)
}
</script>
