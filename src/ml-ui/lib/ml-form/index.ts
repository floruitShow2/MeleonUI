import type { App } from 'vue'
import _Form from './index.vue'

const install = (app: App) => {
  app.component('MlForm', _Form)
}

export type FormInstance = typeof import('./index.vue').default
export type { FormProps, FieldRule } from './index.interface'

export { formInjectionKey } from './context'
export type { FieldItemEntity, FormContext } from './context'

export default { install }
