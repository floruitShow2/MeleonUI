export interface SwitchProps {
  /**
   * @description 开关是否开启
   */
  modelValue: boolean
  /**
   * @description 开关类型
   */
  type: 'circle' | 'square' | 'line'
  /**
   * @description 选中状态的颜色
   */
  checkedColor: string
  /**
   * @description 未选中状态的颜色
   */
  uncheckedColor: string
  /**
   * @description 是否禁用
   */
  disabled: boolean
  /**
   * @description 选择前
   * @returns
   */
  beforeSwitch: (newVal: boolean) => boolean | Promise<boolean>
}
