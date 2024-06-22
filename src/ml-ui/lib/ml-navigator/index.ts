import type { App } from 'vue'
import _Navigator from './index.vue'

const install = (app: App) => {
  app.component('MlNavigator', _Navigator)
}

export type NavigatorInstance = typeof import('./index.vue').default
export type { NavigatorProps, NavigatorToolEntity } from './index.interface'

export default { install }
