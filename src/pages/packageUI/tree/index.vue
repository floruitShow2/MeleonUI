<template>
  <view class="uni_class">
    <MlNavigator
      title="MlTree"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="view-wrapper" :style="wrapperStyle">
      <ml-tree v-model:expanded-keys="expandedKeys" :data="treeData">
        <template #title="{ title }">
          <view class="text" style="color: var(--info-color-8)">{{ title }}测试</view>
        </template>
      </ml-tree>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import type { TreeDataEntity } from '@/ml-ui'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const expandedKeys = ref<string[]>(['0-0'])
  const treeData: TreeDataEntity[] = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Branch 0-0-0',
          key: '0-0-0',
          disabled: true,
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
