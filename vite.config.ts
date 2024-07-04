import { defineConfig } from 'vite'
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import vuejsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), vuejsx()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src')
      },
      {
        find: '@meleon/uni-ui',
        replacement: resolve(__dirname, './src/ml-ui')
      }
    ]
  }
})
