import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'


// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      port: Number(env.VITE_PORT) || 5173,
      host: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        // 指定 SVG 图标文件夹路径
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定 symbolId 格式
        symbolId: 'icon-[dir]-[name]',
        // 自定义插入位置
      }),
      viteMockServe({
        mockPath: 'mock',
        enable: command === 'serve',

      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/variable.scss" as *;'
        }
      }
    }
  }
})
