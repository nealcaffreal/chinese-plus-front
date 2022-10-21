<template>
  <div class="tinymce-container" :style="{ width: handleSize('width'), height: handleSize('height') }">
    <textarea
      v-if="!initOptions.inline"
      id="tinymce-rich-editor"
      ref="elRef"
      :style="{ visibility: 'hidden' }"
    />
    <slot v-else />
  </div>
</template>

<script lang="ts" setup>
import type { Editor, RawEditorSettings } from 'tinymce'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons'
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onDeactivated,
  ref,
  unref,
  useAttrs,
  watch,
} from 'vue'
import { imageOptions, plugins, toolbar } from './tinymce'
import { bindEventHandlers } from './helper'
import { isNumber } from '@/utils/is'
import { onMountedOrActivated } from '@/composables/core/onMountedOrActivated'
import { useDarkTheme } from '@/composables/web/useTheme'
const props = defineProps({
  options: {
    type: Object as PropType<Partial<RawEditorSettings>>,
    default: () => {},
  },
  value: {
    type: String,
  },
  toolbar: {
    type: Array as PropType<string[]>,
    default: toolbar,
  },
  plugins: {
    type: Array as PropType<string[]>,
    default: plugins,
  },
  modelValue: {
    type: String as PropType<string>,
  },
  height: {
    type: [Number, String] as PropType<string | number>,
    default: '100%',
  },
  width: {
    type: [Number, String] as PropType<string | number>,
    default: 'auto',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['change', 'update:modelValue', 'inited', 'initError'])

const attrs = useAttrs()

const editorRef = ref<Nullable<Editor>>(null)
const elRef = ref<Nullable<HTMLElement>>(null)
const { isDark } = useDarkTheme()

function handleSize(type: 'width' | 'height') {
  const val = props[type]
  if (isNumber(val))
    return `${val}px`

  return val
}

// 初始配置
const initOptions = computed((): RawEditorSettings => {
  const { height, options, toolbar, plugins } = props
  const curSkin = isDark.value ? 'oxide-dark' : 'oxide'
  return {
    selector: '#tinymce-rich-editor',
    height,
    // menubar: 'file edit insert view format table',
    menubar: '',
    toolbar,
    plugins,
    language: 'zh_CN',
    language_url: '/tinymce/langs/zh_CN.js',
    branding: false,
    default_link_target: '_blank',
    link_title: false,
    object_resizing: 'img',
    resize: false,
    auto_focus: true,
    skin: curSkin,
    skin_url: `/tinymce/skins/ui/${curSkin}`,
    content_css: `/tinymce/skins/content/${curSkin}/content.min.css`,
    content_style: 'p { margin: 4px 0; } ',
    ...options,
    ...imageOptions,
    setup: (editor: Editor) => {
      editorRef.value = editor as any
      editor.on('init', e => initSetup(e))
    },
  }
})

// 初始化配置
function initSetup(e) {
  const editor = unref(editorRef)
  if (!editor)
    return

  const value = props.modelValue || ''

  editor.setMode(props.disabled ? 'readonly' : 'design')
  editor.setContent(value)
  bindModelHandlers(editor)
  bindEventHandlers(e, attrs, unref(editorRef))
}

// 绑定 Model 变化
function bindModelHandlers(editor: any) {
  watch(
    () => props.modelValue,
    (val: string, prevVal: string) => {
      setValue(editor, val, prevVal)
    },
  )
  watch(
    () => props.value,
    (val: string, prevVal: string) => {
      setValue(editor, val, prevVal)
    },
    { immediate: true },
  )

  editor.on('change keyup undo redo', () => {
    const content = editor.getContent({ format: attrs.outputFormat })
    emit('update:modelValue', content)
    emit('change', content)
  })
}

// 监测 disabled 变化
watch(
  () => props.disabled,
  () => {
    const editor = unref(editorRef)
    if (!editor)
      return

    editor.setMode(props.disabled ? 'readonly' : 'design')
  },
)

// 监测 theme 变化
watch(isDark, () => {
  destory()
  nextTick(initEditor)
})

// 加载或更新时，初始化 editor
onMountedOrActivated(() => {
  nextTick(initEditor)
})

// 初始化 editor
function initEditor() {
  const el = unref(elRef)
  if (el)
    el.style.visibility = ''

  tinymce.init(unref(initOptions)).then((editor) => {
    emit('inited', editor)
  }).catch((err) => {
    emit('initError', err)
  })
}

// 挂载或失活时，销毁 editor
onBeforeUnmount(destory)
onDeactivated(destory)

function destory() {
  if (tinymce !== null)
    tinymce?.remove?.(unref(initOptions).selector!)
}

// 设置 editor 内容
function setValue(editor: Recordable, val: string, prevVal?: string) {
  if (
    editor
    && typeof val === 'string'
    && val !== prevVal
    && val !== editor.getContent({ format: attrs.outputFormat })
  )
    editor.setContent(val)
}
</script>

<script lang="ts">
export default {
  name: 'RichEditorTinymce',
  inheritAttrs: false,
}
</script>

<style lang="less">
.tinymce-container {
  position: relative;
  line-height: normal;
  // height: 100%;

  textarea {
    z-index: -1;
    visibility: hidden;
  }
}
</style>
