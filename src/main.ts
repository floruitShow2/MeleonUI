import { createSSRApp } from 'vue'
import App from './App.vue'
import Pinia from '@/store'
import '@/utils/permission'
export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia)

  return {
    app,
    Pinia
  }
}
