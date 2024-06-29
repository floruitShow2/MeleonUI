import type { TreeNodeEntity } from '../index.interface'

/**
 * @description 判断当前节点是否可选中
 * @param node 节点实体
 * @returns
 */
export function isNodeCheckable(node: TreeNodeEntity) {
  if (node.disabled) return false
  return !!node.checkable
}

export function isNodeExpandable(node: TreeNodeEntity) {
  return !node.disabled && !node.isLeaf && node.children
}

export function isNodeSelectable(node: TreeNodeEntity) {
  return node.selectable && !node.disabled
}
