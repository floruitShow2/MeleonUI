<template>
  <view class="button-view">
    <MlNavigator
      title="MlButton"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="button-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text
            >ml-button 组件的基础用法，包括主要按钮 primary、次要按钮 secondary、线框按钮 outline
            以及文本按钮 text</text
          >
        </template>
        <template #demo>
          <view class="button-container">
            <MlCell label="测试标题"></MlCell>
          </view>
        </template>
      </CodeBlock>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlCell from '@/ml-ui/lib/ml-cell/index.vue'
  import CodeBlock from '@/components/CodeBlock/index.vue'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const templateMap = ref([
    {
      templateCode: `<view class="button-container">
    <MlButton type="primary">Primary</MlButton>
    <MlButton>Secondary</MlButton>
    <MlButton type="outline">Outline</MlButton>
    <MlButton type="text">Text</MlButton>
</view>`
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
