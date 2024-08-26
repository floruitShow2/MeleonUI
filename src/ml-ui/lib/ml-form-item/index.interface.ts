import type { FieldRule } from '../ml-form/index.interface'

export interface FormItemProps {
  /**
   * @description 对应 model 中的字段路径
   */
  field: string
  /**
   * @description 表单的标签
   */
  label: string
  /**
   * @description 表单的额外信息
   */
  extra: string
  /**
   * @description 表单项的校验规则
   */
  rules: FieldRule[]
  /**
   * @description 表单项是否禁用
   */
  disabled: boolean
  /**
   * @description 是否必填
   */
  required: boolean
}
