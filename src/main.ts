import { createSSRApp } from 'vue'
import App from './App.vue'
import Pinia from '@/store'
import Locale from '@/locale'
import '@/utils/permission'
import MeleonUI from '@/ml-ui/lib'
export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia)
  app.use(Locale)
  app.use(MeleonUI)
  console.log('a', app)

  return {
    app,
    Pinia
  }
}
