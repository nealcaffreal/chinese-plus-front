import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
import type { Plugin, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createHtmlPlugin } from 'vite-plugin-html'
import WindiCSS from 'vite-plugin-windicss'
import { vitePluginIconSvg } from './src/plugin/icon'
import { configThemePlugin } from './src/plugin/theme'
import { generateModifyVars } from './src/plugin/theme/generateModifyVars'
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())

  const isBuild = command === 'build'

  // 开发服务器端口
  const port: number = parseInt(process.env.APP_PORT || '7314')

  // 插件
  const plugins: (Plugin | Plugin[] | PluginOption[])[] = [
    vue(),
    vueJsx(),
    vitePluginIconSvg(),
    WindiCSS(),
    configThemePlugin(isBuild),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: env.VITE_APP_TITLE + env.VITE_APP_VERSION,
        },
      },
    }),
  ]

  // @vitejs/plugin-legacy
  isBuild && plugins.push(legacy())

  return {
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: true,
      port,
    },
    build: {
      minify: false,
      outDir: 'dist',
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    optimizeDeps: {
      include: [
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
  }
})
