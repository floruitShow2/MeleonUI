import type { InjectionKey } from 'vue'
import type { FieldRule, FormEvents, ValidateError } from './index.interface'
import type { FormItemEntity } from '../ml-form-item/index.interface'

export interface FormContext {
  // 表单数据
  model: Record<string, any>
  // 校验规则
  rules: Record<string, FieldRule[]>
  // 所有表单项数据的集合
  fields: FormItemEntity[]
  // 是否禁用
  disabled: boolean
  // 表单项标题宽度
  labelWidth: string
  // 新增字段
  addField: (field: FormItemEntity) => void
  // 校验所有字段
  validate: FormEvents['validate']
  // 校验指定字段的表单项
  validateFields: FormEvents['validateFields']
}

const formInjectionKey: InjectionKey<FormContext> = Symbol('ml-form')

export { formInjectionKey }
