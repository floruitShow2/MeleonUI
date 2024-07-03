import { createSSRApp } from 'vue'
import App from './App.vue'
import Pinia from '@/store'
import Locale from '@/locale'
import MeleonUI from '@meleon/uni-ui/lib'
import '@/utils/permission'
export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia)
  app.use(Locale)
  app.use(MeleonUI)

  return {
    app,
    Pinia
  }
}
