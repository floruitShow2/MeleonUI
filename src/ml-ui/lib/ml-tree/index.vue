<template>
  <view :class="className" :style="themeColors">
    <BaseNode
      v-for="node in visibleTreeNodeList"
      :key="node.key"
      :node-key="node.key"
      v-bind="node.treeNodeProps"
    >
      <template #title="{title}">
        <slot name="title" :title="title"></slot>
      </template>
    </BaseNode>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, reactive, computed, provide, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs, isUndefined } from '@meleon/uni-ui/utils'
  import type { TreeProps } from './index.interface'
  import useTreeData from './hooks/useTreeData'
  import BaseNode from './baseNode/index.vue'
  import { treeInjectionKey } from './context'

  const props = defineProps({
    data: {
      type: Array as PropType<TreeProps['data']>,
      required: true
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
    disabled: {
      type: Boolean,
      default: false
    },
    loadMore: {
      type: Boolean,
      default: false
    }
  })
  const {
    data,
    expandedKeys: propExpandedKeys,
    defaultExpandedKeys,
    autoExpandParent,
    loadMore
  } = toRefs(props)

  const emit = defineEmits(['update:expandedKeys', 'expand'])

  const { themeColors } = useTheme()

  const prefix = ref('ml-tree')
  const className = computed(() => {
    return cs(prefix.value)
  })

  const { treeNode, flatternTreeNode, key2TreeNode } = useTreeData(reactive({
    treeData: data.value,
    loadMore: loadMore.value
  }))

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

  /**
   * @description 响应事件
   */
  const emitExpandEvents = (options: {
    targetKey?: string
    targetExpanded: boolean
    newExpandedKeys: string[]
    event?: Event
  }) => {
    const { targetKey, targetExpanded, newExpandedKeys, event } = options
    const targetNode = targetKey ? key2TreeNode.value.get(targetKey) : undefined
    emit('expand', newExpandedKeys, {
      key: targetKey,
      expanded: targetExpanded,
      node: targetNode,
      event
    })
    emit('update:expandedKeys', newExpandedKeys)
  }

  const expandedKeys = computed(() => {
    return isUndefined(propExpandedKeys.value) ? defaultExpandedKeys.value : propExpandedKeys.value
  })
  const visibleTreeNodeList = computed(() => {
    const expandedKeysSet = new Set(expandedKeys.value)

    return flatternTreeNode.value.filter((node) => {
      const isRoot = isUndefined(node.parentNodeKey)
      const isVisisble = (node.parentNodeKeysPath || []).every((key) => expandedKeysSet.has(key))

      return isRoot || isVisisble
    })
  })
  const onExpand = (expanded: boolean, key: string) => {
    const node = key2TreeNode.value.get(key)
    if (!node) return

    const expandedKeysSet = new Set(expandedKeys.value)

    expanded ? expandedKeysSet.add(key) : expandedKeysSet.delete(key)
    const newExpandedKeys = [...expandedKeysSet]
    emitExpandEvents({
      targetKey: key,
      targetExpanded: expanded,
      newExpandedKeys
    })
  }

  onMounted(() => {
    console.log(visibleTreeNodeList.value)
  })

  provide(
    treeInjectionKey,
    reactive({
      key2TreeNode: key2TreeNode.value,
      expandedKeys: expandedKeys.value,
      treeNode: treeNode.value,
      onExpand
    })
  )
</script>

<style lang="less">
  @import './index.less';
</style>
