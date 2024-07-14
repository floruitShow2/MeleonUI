export interface DrawerProps {
  /**
   * @description 页面是否包含顶部导航栏
   */
  hasNav: boolean
  /**
   * @description 抽屉是否可见
   */
  visible: boolean
  /**
   * @description 抽屉的弹出位置
   */
  placement: 'left' | 'right' | 'top' | 'bottom'
  /**
   * @description 抽屉的宽度【仅 placement = 'left' | 'right' 时生效】
   */
  width: number
  /**
   * @description 抽屉的高度【仅 placement = 'top' | 'bottom' 时生效】
   */
  height: number
  /**
   * @description 抽屉的圆角
   */
  radius: number | string
  /**
   * @description 是否展示关闭按钮
   */
  showClose: boolean
  /**
   * @description 是否展示底部
   */
  showFooter: boolean
  /**
   * @description 确认按钮的文案
   */
  okText: string
  /**
   * @description 取消按钮的文案
   */
  cancelText: string
}
