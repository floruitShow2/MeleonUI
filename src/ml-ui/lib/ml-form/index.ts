import type { App } from 'vue'
import _Form from './index.vue'
import type { FormEvents } from './index.interface'

const install = (app: App) => {
  app.component('MlForm', _Form)
}

export type FormInstance = typeof import('./index.vue').default & FormEvents
export type {
  FormProps,
  FieldRule,
  FieldData,
  ValidateError,
  ValidateStatus,
  FormEvents,
  FormEmitsPayload
} from './index.interface'

export { formInjectionKey } from './context'
export type { FormContext } from './context'

export default { install }
