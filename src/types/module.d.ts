declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'ant-design-vue/es/locale/*' {
  import type { Locale } from 'ant-design-vue/types/locale-provider'
  const locale: Locale & ReadonlyRecordable
  export default locale as Locale & ReadonlyRecordable
}

declare module 'virtual:*' {
  const result: any
  export default result
}

