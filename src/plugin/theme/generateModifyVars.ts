import { resolve } from 'path'
import { getThemeVariables } from 'ant-design-vue/dist/theme'
import { darkBg, generateAntColors, primaryColor } from './themeConfig'

/**
 * less global variable
 */
export function generateModifyVars(dark = false) {
  const palettes = generateAntColors(primaryColor)
  const primary = palettes[5]

  const primaryColorObj: Record<string, string> = {}

  for (let index = 0; index < 10; index++)
    primaryColorObj[`primary-${index + 1}`] = palettes[index]

  const modifyVars = getThemeVariables({ dark })

  const antdVars = dark
    ? {
        'border-color-base': '#656a80',
        'popover-background': darkBg.normal,
        'popover-customize-border-color': darkBg.border,
        'body-background': darkBg.normal,
        'component-background': darkBg.normal,
        'modal-header-bg': darkBg.light,
        'modal-footer-bg': darkBg.light,
      }
    : {
        'heading-color': 'rgba(0, 0, 0, 0.65)',
        'text-color': 'rgba(0, 0, 0, 0.65)',
        'text-color-secondary': 'rgba(0, 0, 0, 0.45)',
        'border-color-base': '#d9d9d9',
        'box-shadow-base': '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        'modal-header-bg': primary,
        'modal-heading-color': '#fff',
        'modal-footer-bg': '#edf1fa',
      }

  return {
    ...modifyVars,
    // 全局引入 var.less，不用在每个组件里单独引入了
    // reference:  避免重复引用
    'hack': `${modifyVars.hack} @import (reference) "${resolve('src/styles/var.less')}";`,
    ...primaryColorObj,
    'primary-color': primary,
    'processing-color': primary,
    'success-color': '#52c41a',
    'error-color': '#ff4d4f',
    'warning-color': '#faad14',

    'animation-duration-slow': '0.2s',
    'badge-dot-size': '8px',
    'badge-status-size': '8px',
    'form-item-margin-bottom': '20px',
    'modal-body-padding': '16px',

    ...antdVars,
  }
}
