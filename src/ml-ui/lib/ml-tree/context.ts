import type { InjectionKey } from 'vue'
import type { TreeNodeEntity } from './index.interface'

export interface TreeContext {
  key2TreeNode: Map<string, TreeNodeEntity>
  checkedKeys: string[]
  indeterminateKeys: string[]
  expandedKeys: string[]
  selectedKeys: string[]
  treeNode: TreeNodeEntity[]
  onCheck: (checked: boolean, key: string) => void
  onSelect: (key: string) => void
  onExpand: (expanded: boolean, key: string) => void
}

const treeInjectionKey: InjectionKey<TreeContext> = Symbol('ml-tree')

export { treeInjectionKey }
