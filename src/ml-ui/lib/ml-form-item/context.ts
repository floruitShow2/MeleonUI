import type { InjectionKey } from 'vue'
import type { FormItemEventHandler } from './index.interface'

export interface FormItemContext {
  eventsHanlder: FormItemEventHandler
  disabled: boolean
  isError: boolean
}

const formItemInjectionKey: InjectionKey<FormItemContext> = Symbol(
  'ml-form-item-injection-key'
)

export { formItemInjectionKey }
