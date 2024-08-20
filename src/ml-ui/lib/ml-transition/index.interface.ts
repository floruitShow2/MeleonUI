export type TransitionType =
  | 'fade'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'zoom-in'
  | 'zoom-out'

export interface TransitionProps {
  appear: boolean
  /**
   * @description 动画持续时间
   */
  duration: number
  /**
   * @description 动画类型
   */
  name: TransitionType | (string & {})
  /**
   * @description 自定义类名
   */
  customClass: string
  /**
   * @description 进入过渡的开始状态类名
   */
  enterClass: string
  /**
   * @description 进入过渡的激活状态类名
   */
  enterActiveClass: string
  /**
   * @description 进入过渡的结束状态类名
   */
  enterToClass: string
  /**
   * @description 离开过渡的开始状态类名
   */
  leaveClass: string
  /**
   * @description 离开过渡的激活状态类名
   */
  leaveActiveClass: string
  /**
   * @description 离开过渡的结束状态类名
   */
  leaveToClass: string
}
