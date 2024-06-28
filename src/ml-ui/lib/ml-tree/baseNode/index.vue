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
      <!-- 文本区域 -->
      <view :class="`${prefix}-title-text`">
        <slot name="title" :title="node.title">
          {{ node.title }}
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, inject, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs } from '@meleon/uni-ui/utils'
  import type { TreeNodeEntity } from '../index.interface'
  import { treeInjectionKey, type TreeContext } from '../context'
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
    }
  })
  const { nodeKey } = toRefs(props)

  const emit = defineEmits([])

  const { themeColors } = useTheme()

  const treeContext: Partial<TreeContext> = inject<TreeContext>(treeInjectionKey) || {}
  const prefix = ref('ml-tree-node')
  const className = computed(() => {
    return cs(prefix.value)
  })
  const titleClassName = computed(() => {
    return cs(
      `${prefix.value}-title`,
      {
        [`${prefix.value}-title--leaf`]: !!node.value?.isLeaf
      }
    )
  })

  const node = computed(() => {
    return treeContext.key2TreeNode?.get(nodeKey.value)
  })
  const isExpanded = computed(() => {
    return treeContext.expandedKeys?.includes(nodeKey.value)
  })

  const onSwitcherClick = (expanded: boolean, node?: TreeNodeEntity) => {
    if (!node || node.isLeaf) return
    // 后面加上是否需要动态加载的判断
    treeContext.onExpand?.(expanded, node.key)
  }

  onMounted(() => {
    console.log('node', node.value)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
