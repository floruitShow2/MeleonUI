import type { InjectionKey } from 'vue'
import type { FieldRule, FormEvents, ValidateError } from './index.interface'
import type { FormItemEntity } from '../ml-form-item/index.interface'

export interface FormContext {
  model: Record<string, any>
  rules: Record<string, FieldRule[]>
  disabled: boolean
  fields: FormItemEntity[]
  addField: (field: FormItemEntity) => void
  validateFields: FormEvents['validateFields']
}

const formInjectionKey: InjectionKey<FormContext> = Symbol('ml-form')

export { formInjectionKey }
