export type ValidateErrorStatus = 'danger'
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
   * @description 校验类型
   */
  type?: 'string' | 'array'
}

export interface FieldData {
  value?: any
  status?: ValidateErrorStatus
  message?: string
}

export interface ValidateError {
  label: string
  field: string
  message: string
  status: ValidateErrorStatus
}

export interface FormEvents {
  validateFields: (
    fields: string | string[],
    callback?: (errors: undefined | Record<string, ValidateError>) => void
  ) => Promise<undefined | Record<string, ValidateError>>
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
}
