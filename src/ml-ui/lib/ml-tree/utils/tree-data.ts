import type { Key2TreeNode, TreeDataEntity, TreeNodeEntity, TreeOptions } from '../index.interface'
import { isUndefined } from '@/ml-ui/utils'

interface GenerateEnableInput {
  subEnable?: boolean
  superEnable?: boolean
  // isLeaf: boolean
  // level: number
  // treeNodeData: TreeDataEntity
}
/**
 * @description 判断是否可用某个功能是否可用，子级优先级更高
 * @param subEnable 对应字段在 treeNodeData 上是否设置为可用
 * @param superEnable 对应字段在 tree 组件上是否设置为可用
 * @returns boolean
 */
const generateEnable = (options: GenerateEnableInput) => {
  const { subEnable, superEnable } = options
  if (!isUndefined(subEnable)) return subEnable
  return superEnable ?? false
}
interface GenerateNodeInput {
  treeNodeData: TreeDataEntity
  treeOptions: TreeOptions
  parentNode?: TreeNodeEntity
}
/**
 * @description 生成完整的 Node 实例
 * @returns node TreeNodeEntity
 */
const generateNode = (option: GenerateNodeInput) => {
  const { treeNodeData, treeOptions, parentNode } = option

  // 叶子节点
  const isLeaf = !!(!treeNodeData.children || treeNodeData.children.length === 0)
  const level = parentNode ? parentNode.level + 1 : 0

  const treeNodeProps = {
    checkable: generateEnable({
      subEnable: treeNodeData.checkable,
      superEnable: treeOptions.checkable
    }),
    selectable: generateEnable({
      subEnable: treeNodeData.selectable,
      superEnable: treeOptions.selectable
    }),
    disabled: !!treeNodeData.disabled,
    isLeaf,
    level
  }
  const node: TreeNodeEntity = {
    ...treeNodeProps,
    ...(treeNodeData as TreeNodeEntity),
    // 暂时加上
    treeNodeProps,
    treeNodeData,
    parentNode,
    parentNodeKey: parentNode?.key,
    parentNodeKeysPath: parentNode ? [...(parentNode.parentNodeKeysPath || []), parentNode.key] : []
  }

  return node
}

/**
 * @description 将用户传递的 treeData 转换为 treeNode
 * @param treeData
 * @param treeOptions
 * @param parentNode
 * @returns
 */
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

/**
 * @description 铺平树形 treeNode
 * @param tree
 * @param result
 * @returns
 */
export const translate2FlatterNode = (tree: TreeNodeEntity[], result: TreeNodeEntity[] = []) => {
  tree.forEach((node) => {
    result.push(node)
    if (node.children) {
      translate2FlatterNode(node.children, result)
    }
  })
  return result
}

/**
 * @description 将铺平的 nodeList 转换为 map
 * @param nodeList
 * @returns
 */
export const translateNodeList2Map = (nodeList: TreeNodeEntity[]) => {
  const map: Key2TreeNode = new Map()
  nodeList.forEach((node) => {
    map.set(node.key, node)
  })
  return map
}
