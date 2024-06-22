import type { App } from 'vue'
import _Tab from './index.vue'

const install = (app: App) => {
  app.component('MlTab', _Tab)
}

export type TabInstance = typeof import('./index.vue').default
export type { TabData } from './index.interface'

export default { install }
