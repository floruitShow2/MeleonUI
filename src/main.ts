import { createSSRApp } from 'vue'
import App from './App.vue'
import Pinia from '@/store'
import Locale from '@/locale'
import '@/utils/permission'
import MeleonUI from '@/ml-ui/lib'
import MlButton from '@/ml-ui/lib/ml-button/index.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia)
  app.use(Locale)
  app.use(MeleonUI)
  console.log('a', app)

  app.component('MlButtonGlobal', MlButton)

  return {
    app,
    Pinia
  }
}
