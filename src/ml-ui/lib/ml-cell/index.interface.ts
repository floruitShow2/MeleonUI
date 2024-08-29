import type { ButtonProps } from '../ml-button'

export enum CellTypeEnum {
  CUSTOM = 'custom',
  TEXT = 'text',
  BUTTON = 'button',
  SWITCH = 'switch',
  NAV = 'navigator'
}

export interface CellChangePayload {
  value: string | number
  cell: CellProps
}

export interface CellProps {
  /**
   * @description 单元格类型
   */
  type: CellTypeEnum
  /**
   * @description 单元格左侧提示信息
   */
  label: string
  /**
   * @description 单元格标题下方的提示信息
   */
  description?: string
  /**
   * @description 单元格右侧展示的文本
   */
  value?: string | number | boolean
  /**
   * @description 是否禁用
   */
  disabled: boolean
  /**
   * @description 右侧文本是否可编辑
   */
  allowEdit?: boolean
  /**
   * @description switch cell 默认的选中状态
   */
  defaultChecked?: boolean
  /**
   * @description 按钮的状态
   */
  btnStatus?: ButtonProps['status']
  /**
   * @description 导航cell的跳转链接
   */
  url?: string
  /**
   * @description 描述文字的样式
   */
  descStyle: Meleon.MlStyle
}
