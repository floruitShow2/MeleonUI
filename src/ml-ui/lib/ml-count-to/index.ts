import type { App } from 'vue'
import _CountTo from './index.vue'
import type { CountToEvents } from './index.interface'

const install = (app: App) => {
  app.component('MlCountTo', _CountTo)
}

export type CountToInstance = typeof import('./index.vue').default &
  CountToEvents

export default { install }
