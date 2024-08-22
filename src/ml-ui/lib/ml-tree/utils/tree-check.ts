import { isNodeCheckable } from './tree-is'
import type { Key2TreeNode, TreeNodeEntity } from '../index.interface'

/**
 * @description 更新父级节点的选中情况
 * @param options
 */
export function updateParentCheckedKeys(options: {
  node: TreeNodeEntity
  checkedKeySet: Set<string>
  indeterminateKeySet: Set<string>
}) {
  const { node, checkedKeySet, indeterminateKeySet } = options
  let curParentNode = node.parentNode
  while (curParentNode) {
    if (isNodeCheckable(curParentNode)) {
      const parentNodeKey = curParentNode.key
      const children = curParentNode.children?.filter(isNodeCheckable) || []
      let checkedCount = 0
      const total = children.length
      children.forEach(({ key: childKey }) => {
        if (checkedKeySet.has(childKey)) {
          checkedCount += 1
        } else if (indeterminateKeySet.has(childKey)) {
          checkedCount += 0.5
        }
      })

      if (checkedCount && checkedCount !== total) {
        indeterminateKeySet.add(parentNodeKey)
      } else {
        indeterminateKeySet.delete(parentNodeKey)
      }

      if (checkedCount && checkedCount === total) {
        checkedKeySet.add(parentNodeKey)
      } else {
        checkedKeySet.delete(parentNodeKey)
      }
    }
    curParentNode = curParentNode.parentNode
  }
}

/**
 * @description 获取当前节点所有可选中的子节点
 * @param node
 * @returns
 */
export function getChildrenKeys(node: TreeNodeEntity) {
  const keys: string[] = []
  node.children?.forEach((child) => {
    if (isNodeCheckable(child)) {
      keys.push(child.key, ...getChildrenKeys(child))
    }
  })
  return keys
}

interface GetCheckStateInput {
  node: TreeNodeEntity
  checked: boolean
  checkedKeys: string[]
  indeterminateKeys: string[]
}
/**
 * @description 更新当前节点的父子节点的选中情况
 * @param options
 * @returns
 */
export function getCheckState(options: GetCheckStateInput) {
  const { node, checked, checkedKeys, indeterminateKeys } = options
  const { key } = node

  const checkedKeySet = new Set(checkedKeys)
  const indeterminateKeySet = new Set(indeterminateKeys)

  checked ? checkedKeySet.add(key) : checkedKeySet.delete(key)
  indeterminateKeySet.delete(key)

  // 更新子级节点
  const childrenKeys = getChildrenKeys(node)
  if (checked) {
    childrenKeys.forEach((key) => {
      checkedKeySet.add(key)
    })
  } else {
    childrenKeys.forEach((key) => {
      checkedKeySet.delete(key)
    })
  }
  // 删除半选
  childrenKeys.forEach((key) => {
    indeterminateKeySet.delete(key)
  })
  // 更新父级节点
  updateParentCheckedKeys({ node, checkedKeySet, indeterminateKeySet })

  return [[...checkedKeySet], [...indeterminateKeySet]]
}

interface GetCheckStateWithIntialKeysInput {
  initialCheckedKeys: string[]
  key2TreeNode: Key2TreeNode
}
/**
 * @description 根据默认选中的节点 keys 列表，计算出半选节点
 * @param options
 * @returns
 */
export function getCheckStateWithIntialKeys(
  options: GetCheckStateWithIntialKeysInput
) {
  const { initialCheckedKeys, key2TreeNode } = options
  const checkedKeySet = new Set<string>()
  const childCheckedKeysSet = new Set<string>()
  const indeterminateKeySet = new Set<string>()

  initialCheckedKeys.forEach((key) => {
    const node = key2TreeNode.get(key)
    if (!node || childCheckedKeysSet.has(key)) return

    const childrenKeys = getChildrenKeys(node)
    childrenKeys.forEach((key) => {
      childCheckedKeysSet.add(key)
    })
    checkedKeySet.forEach((key) => {
      indeterminateKeySet.delete(key)
    })

    checkedKeySet.add(key)
    indeterminateKeySet.delete(key)

    updateParentCheckedKeys({
      node,
      checkedKeySet,
      indeterminateKeySet
    })
  })

  return [[...checkedKeySet, ...childCheckedKeysSet], [...indeterminateKeySet]]
}
