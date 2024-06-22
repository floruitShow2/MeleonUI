import type { App } from 'vue'
import _CountTo from './index.vue'

const install = (app: App) => {
  app.component('MlCountTo', _CountTo)
}

export type CountToInstance = typeof import('./index.vue').default

export default { install }
