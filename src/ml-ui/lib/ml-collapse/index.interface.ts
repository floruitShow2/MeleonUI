export interface CollapseProps {
  /**
   * @description 展开的折叠面板 key 值【受控模式】
   */
  activeKeys: Array<string | number>
  /**
   * @description 默认展开的折叠面板 key 值【非受控模式】
   */
  defaultActiveKeys: Array<string | number>
  /**
   * @description 是否开启手风琴模式
   */
  accordion: boolean
}
