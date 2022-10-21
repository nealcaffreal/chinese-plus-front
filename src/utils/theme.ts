import { darkCssIsReady, loadDarkThemeCss, replaceStyleVariables } from 'vite-plugin-theme/es/client'
import { getThemeColors } from '../plugin/theme/themeConfig'

export async function changeTheme(color: string) {
  return await replaceStyleVariables({
    colorVariables: getThemeColors(color),
    // colorVariables: [...getThemeColors(color), ...colors]
  })
}

export async function loadDarkTheme() {
  if (import.meta.env.PROD && !darkCssIsReady)
    await loadDarkThemeCss()
}
