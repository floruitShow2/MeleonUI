import type { InjectionKey } from 'vue'
import type { TreeNodeEntity } from './index.interface'

export interface TreeContext {
  key2TreeNode: Map<string, TreeNodeEntity>
  expandedKeys: string[]
  treeNode: TreeNodeEntity[]
  onExpand: (expanded: boolean, key: string, e?: Event) => void
}

const treeInjectionKey: InjectionKey<TreeContext> = Symbol('ml-tree')

export { treeInjectionKey }
