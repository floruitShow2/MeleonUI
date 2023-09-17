import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import vuejsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), vuejsx()]
})
