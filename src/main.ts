import { createSSRApp } from 'vue'
import App from './App.vue'
import Pinia from '@/store'
export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia)

  return {
    app,
    Pinia
  }
}
