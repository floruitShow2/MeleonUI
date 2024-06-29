// 暴露给用户的节点数据类型
export interface TreeDataEntity {
  title: string
  key: string
  disabled?: boolean
  checkable?: boolean
  selectable?: boolean
  children?: TreeDataEntity[]
}

// 暴露给用户的事件负载类型
interface EmitPayload {
  node: TreeNodeEntity
  nodeData: TreeDataEntity
}
export interface TreeCheckPayload extends EmitPayload {
  checked: boolean
  indeterminateKeys: string[]
}
export interface TreeExpandPayload extends EmitPayload {
  expanded?: boolean
}
export interface TreeSelectPayload extends EmitPayload {
  selected: boolean
}

// 暴露给用户的方法类型
export interface TreeEvents {
  // expand events
  getExpandedNodes: () => TreeNodeEntity[]
  expandNode: (key: string | string[], expanded: boolean) => void
  expandAll: (expandAll?: boolean) => void
  // select events
  getSelectedNodes: () => TreeNodeEntity[]
  selectNode: (key: string | string[], selected: boolean) => void
  selectAll: (selectAll?: boolean) => void
  // check events
  getCheckedNodes: () => TreeNodeEntity[]
  getIndeterminateNodes: () => TreeNodeEntity[]
  checkNode: (key: string | string[], selected: boolean) => void
  checkAll: (selectAll?: boolean) => void
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
