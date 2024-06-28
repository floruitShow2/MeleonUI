<template>
  <view :class="className" :style="themeColors">
    <BaseNode
      v-for="node in visibleTreeNodeList"
      :key="node.key"
      :node-key="node.key"
      v-bind="node.treeNodeProps"
    >
      <template #title="{ title }">
        <slot name="title" :title="title"></slot>
      </template>
    </BaseNode>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, reactive, computed, provide, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme, useMergeState } from '@meleon/uni-ui/hooks'
  import { cs, isUndefined } from '@meleon/uni-ui/utils'
  import type { TreeProps } from './index.interface'
  import useTreeData from './hooks/useTreeData'
  import useCheckedState from './hooks/useCheckState'
  import BaseNode from './baseNode/index.vue'
  import { treeInjectionKey } from './context'
  import { getCheckState } from './utils'

  const props = defineProps({
    data: {
      type: Array as PropType<TreeProps['data']>,
      required: true
    },
    checkable: {
      type: Boolean,
      default: false
    },
    checkedKeys: {
      type: Array as PropType<TreeProps['checkedKeys']>
    },
    defaultCheckedKeys: {
      type: Array as PropType<TreeProps['defaultCheckedKeys']>,
      default: () => []
    },
    indeterminateKeys: {
      type: Array as PropType<TreeProps['indeterminateKeys']>,
      default: () => []
    },
    expandedKeys: {
      type: Array as PropType<TreeProps['expandedKeys']>,
      required: true
    },
    defaultExpandedKeys: {
      type: Array as PropType<TreeProps['defaultExpandedKeys']>,
      default: () => []
    },
    autoExpandParent: {
      type: Boolean,
      default: true
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selectedKeys: {
      type: Array as PropType<TreeProps['selectedKeys']>
    },
    defaultSelectedKeys: {
      type: Array as PropType<TreeProps['defaultSelectedKeys']>,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: true
    },
    loadMore: {
      type: Boolean,
      default: false
    }
  })
  const {
    data,
    // 展开节点
    expandedKeys: propExpandedKeys,
    defaultExpandedKeys,
    autoExpandParent,
    // 选择节点
    selectable,
    selectedKeys: propSelectedKeys,
    defaultSelectedKeys,
    multiple,
    // 选中节点
    checkable,
    checkedKeys: propCheckedKeys,
    defaultCheckedKeys,
    indeterminateKeys: propIndeterminateKeys,
    // 加载更多
    loadMore
  } = toRefs(props)

  const emit = defineEmits([
    'update:expandedKeys',
    'expand',
    'update:selectedKeys',
    'select',
    'update:checkedKeys',
    'check',
    'update:indeterminateKeys'
  ])

  const { themeColors } = useTheme()

  const prefix = ref('ml-tree')
  const className = computed(() => {
    return cs(prefix.value)
  })

  const { treeNode, flatternTreeNode, key2TreeNode } = useTreeData(
    reactive({
      treeData: data.value,
      checkable: checkable.value,
      selectable: selectable.value,
      loadMore: loadMore.value
    })
  )

  function getDefaultExpandedKeys() {
    if (defaultExpandedKeys?.value) {
      const expandedKeysSet = new Set<string>([])
      defaultExpandedKeys.value.forEach((_key) => {
        if (expandedKeysSet.has(_key)) return

        const node = key2TreeNode.value.get(_key)
        if (!node) return
        ;[...(autoExpandParent.value ? node.parentNodeKeysPath || [] : []), _key].forEach((_key) =>
          expandedKeysSet.add(_key)
        )
      })
      return [...expandedKeysSet]
    }
    return []
  }

  const { checkedKeys, indeterminateKeys, setCheckedState } = useCheckedState(reactive({
    defaultCheckedKeys: defaultCheckedKeys.value,
    checkedKeys: propCheckedKeys?.value,
    indeterminateKeys: propIndeterminateKeys.value,
    key2TreeNode: key2TreeNode.value
  }))
  const emitCheckEvent = (options: {
    targetKey?: string
    targetChecked: boolean
    newCheckedKeys: string[]
    newIndeterminateKeys: string[]
  }) => {
    const { targetKey, targetChecked, newCheckedKeys, newIndeterminateKeys } = options
    const targetNode = targetKey ? key2TreeNode.value.get(targetKey) : undefined

    emit('update:checkedKeys', newCheckedKeys)
    emit('update:indeterminateKeys', newIndeterminateKeys)
    emit('check', newCheckedKeys, {
      checked: targetChecked,
      checkedKeys: newCheckedKeys,
      indeterminateKeys: newIndeterminateKeys,
      node: targetNode,
      nodeData: targetNode?.treeNodeData
    })
  }
  const onCheck = (checked: boolean, key: string) => {
    if (!checkable.value) return
    const node = key2TreeNode.value.get(key)
    if (!node) return

    const [newCheckedKeys, newIndeterminateKeys] = getCheckState({
      node,
      checked,
      checkedKeys: checkedKeys?.value || [],
      indeterminateKeys: indeterminateKeys.value
    })

    setCheckedState(newCheckedKeys, newIndeterminateKeys)
    emitCheckEvent({
      targetKey: key,
      targetChecked: checked,
      newCheckedKeys: [...newCheckedKeys],
      newIndeterminateKeys: [...newIndeterminateKeys]
    })
  }

  /**
   * @description 展开节点相关
   */
  // const expandedKeys = computed(() => {
  //   return isUndefined(propExpandedKeys.value) ? defaultExpandedKeys.value : propExpandedKeys.value
  // })
  const [expandedKeys, setExpandedKeys] = useMergeState(
    getDefaultExpandedKeys(),
    reactive({ value: propExpandedKeys })
  )
  const visibleTreeNodeList = computed(() => {
    const expandedKeysSet = new Set(expandedKeys.value)

    return flatternTreeNode.value.filter((node) => {
      const isRoot = isUndefined(node.parentNodeKey)
      const isVisisble = (node.parentNodeKeysPath || []).every((key) => expandedKeysSet.has(key))

      return isRoot || isVisisble
    })
  })
  const emitExpandEvent = (options: {
    targetKey?: string
    targetExpanded: boolean
    newExpandedKeys: string[]
  }) => {
    const { targetKey, targetExpanded, newExpandedKeys } = options
    const targetNode = targetKey ? key2TreeNode.value.get(targetKey) : undefined

    emit('update:expandedKeys', newExpandedKeys)
    emit('expand', newExpandedKeys, {
      expanded: targetExpanded,
      node: targetNode,
      nodeData: targetNode?.treeNodeData
    })
  }
  const onExpand = (expanded: boolean, key: string) => {
    const node = key2TreeNode.value.get(key)
    if (!node) return

    const expandedKeysSet = new Set(expandedKeys.value)

    expanded ? expandedKeysSet.add(key) : expandedKeysSet.delete(key)
    const newExpandedKeys = [...expandedKeysSet]
    setExpandedKeys(newExpandedKeys)
    emitExpandEvent({
      targetKey: key,
      targetExpanded: expanded,
      newExpandedKeys
    })
  }
  /**
   * @description 选择节点相关
   */
  // const selectedKeys = computed(() => {
  //   return isUndefined(propSelectedKeys) ? defaultSelectedKeys.value : propSelectedKeys.value
  // })
  const [selectedKeys, setSelectedKeys] = useMergeState(
    defaultSelectedKeys.value,
    reactive({ value: propSelectedKeys?.value })
  )
  const emitSelectedEvent = (options: {
    targetKey?: string
    targetSelected: boolean
    newSelectedKeys: string[]
  }) => {
    const { targetKey, targetSelected, newSelectedKeys } = options
    const targetNode = targetKey ? key2TreeNode.value.get(targetKey) : undefined

    emit('update:selectedKeys', newSelectedKeys)
    emit('select', newSelectedKeys, {
      selected: !!targetSelected,
      node: targetNode,
      nodeData: targetNode?.treeNodeData
    })
  }
  const onSelect = (key: string) => {
    const node = key2TreeNode.value.get(key)
    if (!node) return

    let newSelectedKeys: string[] = []
    let selected: boolean = false
    if (multiple.value) {
      const selectedKeysSet = new Set(selectedKeys.value)
      // 取反，selected: true 的节点点击后就取消选中了
      selected = !selectedKeysSet.has(key)
      selected ? selectedKeysSet.add(key) : selectedKeysSet.delete(key)
      newSelectedKeys = [...selectedKeysSet]
    } else {
      selected = true
      newSelectedKeys = [key]
    }

    setSelectedKeys(newSelectedKeys)
    emitSelectedEvent({
      targetKey: key,
      targetSelected: selected,
      newSelectedKeys
    })
  }

  provide(
    treeInjectionKey,
    reactive({
      key2TreeNode,
      checkedKeys,
      indeterminateKeys,
      expandedKeys,
      selectedKeys,
      treeNode,
      onCheck,
      onExpand,
      onSelect
    })
  )
</script>

<style lang="less">
  @import './index.less';
</style>
