<template>
  <view class="uni_class">
    <ml-navigator
      title="ml-tree"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="view-wrapper" :style="wrapperStyle">
      <ml-tree
        class="tree-wrapper"
        ref="treeRef"
        v-model:expanded-keys="expandedKeys"
        v-model:checked-keys="checkedKeys"
        v-model:selected-keys="selectedKeys"
        v-model:indeterminate-keys="indeterminateKeys"
        :data="treeData"
        checkable
        selectable
        multiple
        :auto-expand-parent="false"
        @check="handleCheck"
        @select="handleSelect"
        @expand="handleExpand"
      ></ml-tree>

      <view class="btn-list">
        <ml-button class="btn" type="primary" @click="handleExpandAll">
          {{ isExpandAll ? 'Close All' : 'Expand All' }}
        </ml-button>

        <ml-button class="btn" type="primary" @click="handleCheckAll">
          {{ isCheckAll ? 'Unheck All' : 'Check All' }}
        </ml-button>

        <ml-button class="btn" type="primary" @click="handleSelectAll">
          {{ isSelectAll ? 'Unselect All' : 'Select All' }}
        </ml-button>

        <ml-button class="btn" type="primary" @click="handleExpandNode"> Expand Root </ml-button>

        <ml-button class="btn" type="primary" @click="handleCheckNode"> Check Root </ml-button>

        <ml-button class="btn" type="primary" @click="handleSelectNode"> Select Root </ml-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import type {
    TreeDataEntity,
    TreeCheckPayload,
    TreeExpandPayload,
    TreeSelectPayload,
    TreeInstance
  } from '@meleon/uni-ui/index'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const treeRef = ref<TreeInstance>()
  const rootKey = ref('0-0')
  const expandedKeys = ref<string[]>(['0-0-0'])
  const checkedKeys = ref<string[]>([])
  const selectedKeys = ref<string[]>([])
  const indeterminateKeys = ref<string[]>([])
  const handleCheck = (val: string[], payload: TreeCheckPayload) => {
    console.log('onCheck', val, payload)
  }
  const handleExpand = (val: string[], payload: TreeExpandPayload) => {
    console.log('onExpand', val, payload)
  }
  const handleSelect = (val: string[], payload: TreeSelectPayload) => {
    console.log('onSelect', val, payload)
  }

  const isExpandAll = ref(false)
  const handleExpandAll = () => {
    if (!treeRef.value) return
    isExpandAll.value = !isExpandAll.value
    treeRef.value.expandAll(isExpandAll.value)
  }
  const handleExpandNode = () => {
    if (!treeRef.value) return
    treeRef.value.expandNode(rootKey.value, true)
  }

  const isCheckAll = ref(false)
  const handleCheckAll = () => {
    if (!treeRef.value) return
    isCheckAll.value = !isCheckAll.value
    treeRef.value.checkAll(isCheckAll.value)
  }
  const handleCheckNode = () => {
    if (!treeRef.value) return
    treeRef.value.checkNode(rootKey.value, true)
  }

  const isSelectAll = ref(false)
  const handleSelectAll = () => {
    if (!treeRef.value) return
    isSelectAll.value = !isSelectAll.value
    treeRef.value.selectAll(isSelectAll.value)
  }
  const handleSelectNode = () => {
    if (!treeRef.value) return
    treeRef.value.selectNode(rootKey.value, true)
  }

  const treeData: TreeDataEntity[] = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Branch 0-0-0',
          key: '0-0-0',
          disabled: false,
          children: [
            {
              title: 'Leaf',
              key: '0-0-0-0'
            },
            {
              title: 'Leaf',
              key: '0-0-0-1'
            }
          ]
        },
        {
          title: 'Branch 0-0-1',
          key: '0-0-1',
          children: [
            {
              title: 'Leaf',
              key: '0-0-1-0'
            }
          ]
        }
      ]
    }
  ]
</script>

<style lang="less">
  @import './index.less';
</style>
