<template>
  <div ref="el" class="relative !h-full w-full overflow-hidden" />
</template>

<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref, unref, watch, watchEffect } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import CodeMirror from 'codemirror'
import { MODE } from '../types'
import { useDarkTheme } from '@/composables/web/useTheme'
import { useWindowSizeFn } from '@/composables/event/useWindowSizeFn'
// css
import './codemirror.css'
import 'codemirror/theme/juejin.css'
import 'codemirror/theme/material-darker.css'
// modes
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'

const props = defineProps({
  mode: {
    type: String as PropType<MODE>,
    default: MODE.JSON,
    validator(value: any) {
      return Object.values(MODE).includes(value)
    },
  },
  value: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
})

const emit = defineEmits(['change'])

const el = ref()
let editor: Nullable<CodeMirror.Editor>

const debounceRefresh = useDebounceFn(refresh, 100)
const { isDark } = useDarkTheme()

watch(
  () => props.value,
  async (value) => {
    await nextTick()
    const oldValue = editor?.getValue()
    if (value !== oldValue)
      editor?.setValue(value || '')
  },
  { flush: 'post' },
)

watchEffect(() => {
  editor?.setOption('mode', props.mode)
})

watch(isDark, async () => {
  setTheme()
}, { immediate: true },
)

function setTheme() {
  unref(editor)?.setOption('theme',
    isDark.value ? 'material-darker' : 'juejin',
  )
}

function refresh() {
  editor?.refresh()
}

async function init() {
  const addonOptions = {
    autoCloseBrackets: true,
    autoCloseTags: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers'],
  }

  editor = CodeMirror(el.value!, {
    value: '',
    mode: props.mode,
    readOnly: props.readonly,
    tabSize: 2,
    theme: 'material-palenight',
    lineWrapping: true,
    lineNumbers: true,
    ...addonOptions,
  })
  editor?.setValue(props.value)
  setTheme()
  editor?.on('change', () => {
    emit('change', editor?.getValue())
  })
}

onMounted(async () => {
  await nextTick()
  init()
  useWindowSizeFn(debounceRefresh)
})

onUnmounted(() => {
  editor = null
})
</script>
