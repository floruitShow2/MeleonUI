export interface BaseMlProgressProps {
  /**
   * @description 进度条类型
   */
  type: 'circle' | 'line'
  /**
   * @description 进度值
   */
  percent: number
  /**
   * @description 保留小数点位数
   */
  decimal: number

  // 显隐相关配置
  /**
   * @description 是否展示文本
   */
  showText: boolean

  // 样式相关配置
  /**
   * @description 尺寸
   */
  size: MlDesign.Size
  /**
   * @description 进度条长度
   */
  width: number
  /**
   * @description 进度条宽度
   */
  strokeWidth: number

  /**
   * @description 进度条状态
   */
  status: MlDesign.Type
  /**
   * @description 激活状态线段颜色
   */
  color: string | Record<string, string>
  /**
   * @description 背景颜色
   */
  trackColor: string
}
