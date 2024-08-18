export interface WithId {
  id: string | number | symbol
  [key: string]: any
}

export interface ListProps {
  // 通用属性
  /**
   * @description 列表数据
   */
  data: WithId[]
  /**
   * @description 列表高度
   */
  height: number
  /**
   * @description 列表项的高度
   */
  itemHeight: number
  /**
   * @description 是否正在加载中
   */
  loading: boolean
  /**
   * @description 加载中文本
   */
  loadingText: string
  /**
   * @description 是否触发异常
   */
  error: boolean
  /**
   * @description 加载异常文本
   */
  errorText: string
  /**
   * @description 是否加载完成
   */
  finished: boolean
  /**
   * @description 加载完成文本
   */
  finishedText: string
  /**
   * @description 是否显示滚动到顶部按钮
   */
  showToTop: boolean
  /**
   * @description 单元格布局或列表布局
   */
  type: 'grid' | 'row'
  /**
   * @description 滚动区域样式
   */
  scrollStyle: Meleon.MlStyle

  // 虚拟列表属性
  /**
   * @description 是否开启虚拟列表
   */
  virtualList: boolean
  /**
   * @description 单页展示的数量
   */
  pageSize: number
  /**
   * @description 是否展示底部提示信息
   */
  showTip: boolean
}

export interface ListEvents {
  /**
   * @description 滚动到顶部
   * @returns
   */
  scrollToTop: () => void
  /**
   * @description 仅在普通列表中生效
   * @param id 列表项的 id
   * @returns
   */
  scrollIntoView: (id: WithId['id']) => void
}
