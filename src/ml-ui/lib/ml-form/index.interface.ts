export interface FieldRule {
  /**
   * @description 是否必须
   */
  required?: true
  /**
   * @description 提示消息
   */
  message?: string
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
