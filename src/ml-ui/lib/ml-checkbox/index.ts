import type { App } from 'vue'
import _Checkbox from './index.vue'

const install = (app: App) => {
  app.component('MlCheckbox', _Checkbox)
}

export type CheckboxInstance = typeof import('./index.vue').default
export type { CheckboxProps } from './index.interface'

export default { install }
