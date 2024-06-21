import type { App } from 'vue'
import _Icon from './index.vue'

const install = (app: App) => {
  app.component('MlIcon', _Icon)
}

export type IconInstance = typeof import('./index.vue').default

export default { install }
