import type { App } from 'vue'
import _Select from './index.vue'

const install = (app: App) => {
  app.component('MlSelect', _Select)
}

export type SelectInstance = typeof import('./index.vue').default
export type { SelectProps } from './index.interface'

export default { install }
