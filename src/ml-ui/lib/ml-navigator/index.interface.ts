import type { MlStyle } from "@meleon/uni-ui/interface/component"

export interface NavigatorToolEntity {
  icon: string
  color: string
  type: 'return' | 'navigator'
  delta?: number
  path?: string
}

export interface NavigatorProps {
  /**
   * @description 导航栏背景色
   */
  background: string
  /**
   * @description 标题
   */
  title: string
  /**
   * @description 标题颜色
   */
  titleColor: string
  /**
   * @description 标题样式
   */
  titleStyle: MlStyle
  /**
   * @description 图标样式
   */
  iconStyle: MlStyle
  /**
   * @description 是否展示返回按钮
   */
  hasBack: boolean
  /**
   * @description 工具栏
   */
  tools: NavigatorToolEntity[]
}
