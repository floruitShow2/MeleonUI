// 暴露给用户的节点类型
export interface TreeDataEntity {
  title: string
  key: string
  disabled?: boolean
  checkable?: boolean
  selectable?: boolean
  children?: TreeDataEntity[]
}

// 经过处理后，完整的节点类型
export interface TreeNodeEntity extends TreeDataEntity {
  level: number
  isLeaf: boolean
  parentNode?: TreeNodeEntity
  parentNodeKey?: string
  parentNodeKeysPath?: string[]
  treeNodeData: TreeDataEntity
  treeNodeProps: Partial<TreeNodeEntity>
  children?: TreeNodeEntity[]
}

export interface TreeOptions {
  checkable: boolean
  selectable: boolean
  loadMore: boolean
}

export type Key2TreeNode = Map<string, TreeNodeEntity>

// 组件props
export interface TreeProps {
  data: TreeDataEntity[]
  /**
   * @description 展开节点的 key 值列表
   */
  expandedKeys: string[]
  /**
   * @description 默认展开节点的 key 值列表
   */
  defaultExpandedKeys: string[]
  /**
   * @description 是否自动展开父节点
   */
  autoExpandParent: boolean
  /**
   * @description 是否支持选择文本节点
   */
  selectable: boolean
  /**
   * @description 选中节点的 key 值列表
   */
  selectedKeys: string[]
  /**
   * @description 默认选中节点的 key 值列表
   */
  defaultSelectedKeys: string[]
  /**
   * @description 是否支持多选
   */
  multiple: boolean
  /**
   * @description 是否显示选择器
   */
  checkable: boolean
  /**
   * @description 选中复选框的节点的 key 值列表
   */
  checkedKeys: string[]
  /**
   * @description 默认选中复选框的节点的 key 值列表
   */
  defaultCheckedKeys: string[]
  /**
   * @description 半选的 key 值的列表
   */
  indeterminateKeys: string[]
  /**
   * @description 是否支持异步加载
   */
  loadMore: boolean
}
