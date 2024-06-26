<template>
  <view :class="className" :style="themeColors">
    <view
      v-for="node in visibleTreeNodeList"
      :key="node.key"
      :class="`${prefix}-node`"
      :data-level="node.level"  
    >
      <!-- 缩进 -->
      <text
        :class="`${prefix}-node-indent`"
        :style="{
          paddingLeft: `${node.level * 20}px`
        }"
      ></text>
      <!-- 内容 -->
      <text :class="titleClassName">
        <!-- 图标区域 -->
        <!-- 文本区域 -->
        <text :class="`${titleClassName}-text`">
          <slot name="title">
            {{ node.title }}
          </slot>
        </text>
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs, isUndefined } from '@meleon/uni-ui/utils'
  import type { TreeProps } from './index.interface'
  import useTreeData from './hooks/useTreeData'

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

  const emit = defineEmits([])

  const { themeColors } = useTheme()

  const prefix = ref('ml-tree')
  const className = computed(() => {
    return cs(prefix.value)
  })

  const { treeNode, flatternTreeNode, key2TreeNode } = useTreeData(
    {
      treeData: data.value,
      loadMore: loadMore.value
    }
  )

  function getDefaultExpandedKeys() {
      if (defaultExpandedKeys?.value) {
        const expandedKeysSet = new Set<string>([])
        defaultExpandedKeys.value.forEach((_key) => {
          if (expandedKeysSet.has(_key)) return

          const node = key2TreeNode.value.get(_key);
          if (!node) return;

          [
            ...(autoExpandParent.value ? (node.parentNodeKeysPath || []) : []),
            _key,
          ].forEach((_key) => expandedKeysSet.add(_key));
        });
        return [...expandedKeysSet];
      }
      return []
    }

  const expandedKeys = computed(() => {
    return isUndefined(propExpandedKeys.value) ? defaultExpandedKeys.value : propExpandedKeys.value
  })
  const visibleTreeNodeList = computed(() => {
    const expandedKeysSet = new Set(expandedKeys.value)

    return flatternTreeNode.value.filter(node => {
      const isRoot = isUndefined(node.parentNodeKey)
      const isVisisble = (node.parentNodeKeysPath || []).every(key => expandedKeysSet.has(key))

      return isRoot || isVisisble
    })
  })

  onMounted(() => {
    console.log(visibleTreeNodeList.value)
  })

  const titleClassName = computed(() => {
    return cs(`${prefix}-title`)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
