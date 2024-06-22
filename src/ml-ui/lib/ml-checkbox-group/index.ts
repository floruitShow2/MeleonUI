import type { App } from 'vue'
import _CheckboxGroup from './index.vue'
import type { CheckboxGroupProps } from './index.interface'
const install = (app: App) => {
  app.component('MlCheckboxGroup', _CheckboxGroup)
}

export type CheckboxGroupInstance = typeof import('./index.vue').default

export type { CheckboxGroupProps }
export default { install }
