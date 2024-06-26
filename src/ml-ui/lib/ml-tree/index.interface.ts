// 暴露给用户的节点类型
export interface TreeDataEntity {
  title: string
  key: string
  disabled?: boolean
  children?: TreeDataEntity[]
}

// 经过处理后，完整的节点类型
export interface TreeNodeEntity extends TreeDataEntity {
    level: number
    isLeaf: boolean
    parentNode?: TreeNodeEntity
    parentNodeKey?: string
    parentNodeKeysPath?: string[]
    treeNodeProps: Partial<TreeNodeEntity>
    children?: TreeNodeEntity[]
}

export interface TreeOptions {
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
  disabled: boolean
  loadMore: boolean
}
