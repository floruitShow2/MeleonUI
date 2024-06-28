import { toRaw } from 'vue'
import type { Key2TreeNode, TreeDataEntity, TreeNodeEntity, TreeOptions } from '../index.interface'

interface GenerateNodeInput {
  treeNodeData: TreeDataEntity
  treeOptions: TreeOptions
  parentNode?: TreeNodeEntity
}

const generateNode = (option: GenerateNodeInput) => {
  const { treeNodeData, parentNode } = option

  // 叶子节点
  const isLeaf = !!(!treeNodeData.children || treeNodeData.children.length === 0)
  const level = parentNode ? parentNode.level + 1 : 0

  const treeNodeProps = {
    disabled: !!treeNodeData.disabled,
    isLeaf,
    level
  }
  const node: TreeNodeEntity = {
    ...treeNodeProps,
    ...(treeNodeData as TreeNodeEntity),
    // 暂时加上
    treeNodeProps,
    parentNode,
    parentNodeKey: parentNode?.key,
    parentNodeKeysPath: parentNode ? [...(parentNode.parentNodeKeysPath || []), parentNode.key] : []
  }

  return node
}

export const translateData2Node = (
  treeData: TreeDataEntity[],
  treeOptions: TreeOptions,
  parentNode?: TreeNodeEntity
) => {
  if (!treeData) return []

  const nodes: TreeNodeEntity[] = []
  treeData.forEach((treeNode) => {
    const node = generateNode({
      treeNodeData: treeNode,
      treeOptions,
      parentNode
    })
    node.children = translateData2Node(treeNode.children || [], treeOptions, node)
    nodes.push(node)
  })

  return nodes
}

export const translate2FlatterNode = (tree: TreeNodeEntity[], result: TreeNodeEntity[] = []) => {
  tree.forEach((node) => {
    result.push(node)
    if (node.children) {
      translate2FlatterNode(node.children, result)
    }
  })
  return result
}

export const translateNodeList2Map = (nodeList: TreeNodeEntity[]) => {
  const map: Key2TreeNode = new Map()
  nodeList.forEach((node) => {
    map.set(node.key, node)
  })
  return map
}
