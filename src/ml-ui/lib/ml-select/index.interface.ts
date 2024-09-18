import type { OptionProps } from '../ml-option'

export interface SelectProps {
  /**
   * @description 绑定值
   */
  modelValue: OptionProps['value'] | OptionProps['value'][]
  /**
   * @description 选项列表
   */
  options: OptionProps[]
  /**
   * @description 选择器的宽度
   */
  width: number
  /**
   * @description 选择器的占位值
   */
  placeholder: string
  /**
   * @description 选择器的尺寸
   */
  size: Meleon.MlSize
  /**
   * @description 是否支持复选
   */
  multiple: boolean
  /**
   * @description 展示最大数量
   */
  maxTagCount: number
  /**
   * @description 是否支持筛选
   */
  filterable: boolean
  /**
   * @description 是否禁用
   */
  disabled: boolean
  /**
   * @description 是否将下拉菜单添加到父元素
   */
  addToParent: boolean
  /**
   * @description 复选状态，是否支持多选
   */
  allowCreate: boolean
  /**
   * @description 展开方向
   */
  direction: 'top' | 'bottom'
}
