import { generate } from '@ant-design/colors'

export const primaryColor = '#6366f1'
export const darkBg = {
  'normal': '#20232e',
  'light': '#2f323a',
  'light-1': '#454754',
  'border': '#656a80',
}

export const darkMode = 'light'

type Fn = (...arg: any) => any

type GenerateTheme = 'default' | 'dark'

export interface GenerateColorsParams {
  mixLighten: Fn
  mixDarken: Fn
  tinycolor: any
  color?: string
}

export function generateAntColors(color: string, theme: GenerateTheme = 'default') {
  return generate(color, {
    theme,
  })
}

export function getThemeColors(color?: string) {
  const tc = color || primaryColor
  const lightColors = generateAntColors(tc)
  const primary = lightColors[5]
  const modeColors = generateAntColors(primary, 'dark')

  return [...lightColors, ...modeColors]
}
