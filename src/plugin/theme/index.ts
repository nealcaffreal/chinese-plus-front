import type { Plugin } from 'vite'
import { antdDarkThemePlugin, viteThemePlugin } from 'vite-plugin-theme'
import { getThemeColors } from './themeConfig'
import { generateModifyVars } from './generateModifyVars'

export function configThemePlugin(isBuild: boolean): Plugin[] {
  const vite_theme_plugin = viteThemePlugin({
    colorVariables: getThemeColors(),
  })

  // vite 2.5.10 以上版本，打包后主题切换不生效
  // 解决方法参见 https://gitee.com/thinkgem/jeesite-vue/commit/8cddc3e006cf5992db9aaf2cdfeae9d62a13b708
  // 打包时去除 enforce: "post"，vite 2.6.x 适配，否则生成 app-theme-style 为空，
  // 因为 async transform(code, id) {的code没有正确获取
  vite_theme_plugin.forEach((item) => {
    // 对 vite:theme 插件特殊配置
    if (item.name === 'vite:theme') {
      if (isBuild)
        delete item.enforce
    }
  })

  const plugin = [
    vite_theme_plugin,
    antdDarkThemePlugin({
      darkModifyVars: {
        ...generateModifyVars(true),
      },
    }),
  ]

  return plugin as unknown as Plugin[]
}
