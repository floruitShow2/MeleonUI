export interface IconSwitcherProps {
  /**
   * @description 切换前图标
   */
  prevIcon: string
  /**
   * @description 切换后图标
   */
  nextIcon: string
  /**
   * @description 是否默认已切换
   */
  defaultSwitched: boolean
  /**
   * @description 是否开启加载状态
   */
  loading: boolean
  /**
   * @description 图标大小，同 ml-icon 组件
   */
  size: number
  /**
   * @description 图标颜色，同 ml-icon 组件
   */
  color: string
}
