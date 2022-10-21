import type {
  InjectionKey,
  UnwrapRef,
} from 'vue'
import {
  readonly as defineReadonly,
  inject,
  provide,
  reactive,
} from 'vue'

export interface CreateContextOptions {
  readonly?: boolean
  native?: boolean
}

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
}

export function createContext<T>(
  context: any,
  key: InjectionKey<T> = Symbol(''),
  options: CreateContextOptions = {},
) {
  const { readonly = true, native = false } = options

  const state = reactive(context)
  const provideData = readonly ? defineReadonly(state) : state
  provide(key, native ? context : provideData)

  return {
    state,
  }
}

export function useContext<T>(key: InjectionKey<T> = Symbol(''), defaultValue?: any): ShallowUnwrap<T> {
  return inject(key, defaultValue || {})
}
