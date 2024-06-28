<template>
  <view v-if="!!node" :class="className" :style="themeColors" :data-level="level">
    <!-- 缩进 -->
    <text
      :class="`${prefix}-node-indent`"
      :style="{
        paddingLeft: `${node.level * 20}px`
      }"
    ></text>
    <!-- 内容 -->
    <view :class="titleClassName">
      <!-- 图标区域 -->
      <IconSwitcher
        v-if="!node.isLeaf"
        :class="`${prefix}-title-switcher`"
        :default-switched="isExpanded"
        prev-icon="ml-arrow-right--fill"
        next-icon="ml-arrow--fill"
        @change="(expanded: boolean) => onSwitcherClick(expanded, node)"
      />
      <!-- 选择框区域 -->
      <Checkbox
        v-if="node.checkable"
        :class="`${prefix}-title-check`"
        :checked="isChecked"
        :indeterminate="isIndeterminate"
        :disabled="disabled"
        size="mini"
        @update:checked="(checked: boolean) => onCheckboxClick(checked, node)"
      />
      <!-- 文本区域 -->
      <view :class="`${prefix}-title-text`" @click="onTitleClick(node)">
        <slot name="title" :title="node.title" />
        <text v-if="$slots['title']">{{ node.title }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, watch, inject, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs } from '@meleon/uni-ui/utils'
  import type { TreeNodeEntity } from '../index.interface'
  import { treeInjectionKey, type TreeContext } from '../context'
  import Checkbox from '../../ml-checkbox/index.vue'
  import IconSwitcher from '../../ml-icon-switcher/index.vue'

  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    nodeKey: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      default: 0
    },
    checkable: {
      type: Boolean,
      default: true
    },
    selectable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })
  const { nodeKey, checkable, selectable, disabled } = toRefs(props)

  const emit = defineEmits([])

  const { themeColors } = useTheme()

  const treeContext: Partial<TreeContext> = inject<TreeContext>(treeInjectionKey) || {}
  const prefix = ref('ml-tree-node')
  const className = computed(() => {
    return cs(prefix.value)
  })
  const titleClassName = computed(() => {
    return cs(`${prefix.value}-title`, {
      [`${prefix.value}-title--disabled`]: disabled.value,
      [`${prefix.value}-title--leaf`]: !!node.value?.isLeaf,
      [`${prefix.value}-title--selected`]: !!isSelected.value
    })
  })

  const node = computed(() => {
    return treeContext.key2TreeNode?.get(nodeKey.value)
  })
  const isChecked = computed(() => {
    return treeContext.checkedKeys?.includes(nodeKey.value)
  })
  const isIndeterminate = computed(() => {
    return treeContext.indeterminateKeys?.includes(nodeKey.value)
  })
  const isExpanded = computed(() => {
    return treeContext.expandedKeys?.includes(nodeKey.value)
  })
  const isSelected = computed(() => {
    return treeContext.selectedKeys?.includes(nodeKey.value)
  })

  /**
   * @description 点击到展开图标
   * @param expanded 是否展开
   * @param node 对应的节点信息
   */
  const onSwitcherClick = (expanded: boolean, node?: TreeNodeEntity) => {
    if (!node || node.isLeaf) return
    // 后面加上是否需要动态加载的判断
    treeContext.onExpand?.(expanded, node.key)
  }
  const onCheckboxClick = (checked: boolean, node?: TreeNodeEntity) => {
    if (!node || !checkable.value) return
    treeContext.onCheck?.(checked, node.key)
  }
  /**
   * @description 点击到标题
   * @param node 对应的节点信息
   */
  const onTitleClick = (node?: TreeNodeEntity) => {
    if (!selectable.value || disabled.value || !node) return
    treeContext.onSelect?.(node.key)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
