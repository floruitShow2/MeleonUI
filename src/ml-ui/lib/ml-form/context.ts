import type { InjectionKey } from 'vue'
import type { FieldRule } from './index.interface'

export interface FieldItemEntity {
  field: string
  disabled: boolean
}

export interface FormContext {
  model: Record<string, any>
  rules: Record<string, FieldRule[]>
  disabled: boolean
  fields: FieldItemEntity[]
}

const formInjectionKey: InjectionKey<FormContext> = Symbol('ml-form')

export { formInjectionKey }
