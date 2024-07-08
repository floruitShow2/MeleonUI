interface WithId {
  id: string | number | symbol
  [key: string]: any
}

export interface ListProps {
  /**
   * @description 列表数据
   */
  data: WithId[]
  /**
   * @description 单页展示的数量
   */
  pageSize: number
  /**
   * @description 列表高度
   */
  height: number
  /**
   * @description 是否开启虚拟列表
   */
  virtualList: boolean
  /**
   * @description 是否正在加载中
   */
  loading: boolean
  /**
   * @description 是否加载完成
   */
  finished: boolean
  /**
   * @description 单元格布局或列表布局
   */
  type: 'grid' | 'row'
}
