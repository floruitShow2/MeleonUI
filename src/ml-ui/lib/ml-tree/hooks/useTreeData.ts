import { ref, computed, toRefs, watchEffect } from 'vue'
import type { TreeDataEntity, TreeNodeEntity, TreeOptions } from '../index.interface'
import { translateData2Node, translate2FlatterNode, translateNodeList2Map } from '../utils'

export default function useTreeData(props: Partial<TreeOptions> & { treeData: TreeDataEntity[] }) {
  const { treeData, checkable, selectable, loadMore } = toRefs(props)

  const treeNode = ref<TreeNodeEntity[]>([])
  watchEffect(() => {
    treeNode.value = translateData2Node(treeData.value, {
      loadMore: !!loadMore?.value,
      checkable: !!checkable?.value,
      selectable: !!selectable?.value
    })
  })

  const flatternTreeNode = computed(() => translate2FlatterNode(treeNode.value))
  const key2TreeNode = computed(() => translateNodeList2Map(flatternTreeNode.value))

  return { treeNode, flatternTreeNode, key2TreeNode }
}
