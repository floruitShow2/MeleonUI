import type { FormItemEntity } from '../ml-form-item'
import type { ValidateTrigger } from '../ml-form-item/index.interface'

export type ValidateStatus = 'success' | 'warning' | 'error' | 'validating'

export interface FieldRule {
  /**
   * @description 是否必须
   */
  required?: true
  /**
   * @description 提示消息
   */
  message?: string
  /**
   * @description 校验长度
   */
  length?: number
  /**
   * @description 最小长度
   */
  minLength?: number
  /**
   * @description 最大长度
   */
  maxLength?: number
  /**
   * @description 校验类型
   */
  type?: 'string' | 'array'
  /**
   * @description 校验时机
   */
  trigger?: ValidateTrigger | ValidateTrigger[]
  /**
   * @description 自定义校验器
   * @param value
   * @param callback
   * @returns
   */
  validator?: (value: any, callback: (error?: string) => void) => void
}

export interface FieldData {
  value?: any
  status?: ValidateStatus
  message?: string
}

export interface ValidateError {
  label: string
  field: string
  message: string
  status: ValidateStatus
}

export interface FormEvents {
  clearValidate: (field?: string | string[]) => void
  validate: () => Promise<undefined | Record<string, ValidateError>>
  validateFields: (
    fields: string | string[],
    callback?: (errors: undefined | Record<string, ValidateError>) => void
  ) => Promise<undefined | Record<string, ValidateError>>
}

export interface FormEmitsPayload {
  submit: (payload: {
    errors: Record<string, ValidateError> | undefined
    fields: FormItemEntity[]
    model: Record<string, any>
  }) => void
}

export interface FormProps {
  /**
   * @description 表单数据模型
   */
  model: Record<string, any>
  /**
   * @description 表单校验规则
   */
  rules: Record<string, FieldRule[]>
  /**
   * @description 是否禁用
   */
  disabled: boolean
  /**
   * @description 标签文本宽度
   */
  labelWidth: string
}
