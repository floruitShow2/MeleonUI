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
            <MlButton type="primary">Primary</MlButton>
            <MlButton>Secondary</MlButton>
            <MlButton type="outline">Outline</MlButton>
            <MlButton type="text">Text</MlButton>
          </view>
        </template>
      </CodeBlock>
      <!-- 按钮形状 -->
      <CodeBlock :code="templateMap[1].templateCode">
        <template #title>
          <text>按钮形状</text>
        </template>
        <template #description>
          <text>按钮分为 square - 长方形（默认）、circle - 圆形、round - 圆角三种形状</text>
        </template>
        <template #demo>
          <view class="button-container">
            <MlButton type="primary" shape="square">Square</MlButton>
            <MlButton type="primary" shape="round">Round</MlButton>
            <MlButton type="primary" shape="square">
              <template #icon>
                <MlIcon icon="ml-plus" color="#FFFFFF" />
              </template>
            </MlButton>
            <MlButton type="primary" shape="circle">
              <MlIcon icon="ml-plus" color="#FFFFFF" />
            </MlButton>
          </view>
        </template>
      </CodeBlock>
      <!-- 按钮尺寸 -->
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>按钮尺寸</text>
        </template>
        <template #description>
          <text>
            按钮分为 mini、small、medium、large
            四种尺寸。高度分别为：28px、32px、36px、40px。推荐（默认）尺寸为
            medium。可在不同场景及不同业务需求选择适合尺寸
          </text>
        </template>
        <template #demo>
          <view class="button-container">
            <MlButton type="primary" size="mini">Mini</MlButton>
            <MlButton type="primary" size="small">Small</MlButton>
            <MlButton type="primary" size="medium">Medium</MlButton>
            <MlButton type="primary" size="large">Large</MlButton>
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
  import MlIcon from '@/ml-ui/lib/ml-icon/index.vue'
  import MlButton from '@/ml-ui/lib/ml-button/index.vue'
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
    },
    {
      templateCode: `<view class="button-container">
  <MlButton type="primary" shape="square">Square</MlButton>
  <MlButton type="primary" shape="round">Round</MlButton>
  <MlButton type="primary" shape="square">
    <template #icon>
      <MlIcon icon="ml-plus" color="#FFFFFF" />
    </template>
  </MlButton>
  <MlButton type="primary" shape="circle">
    <MlIcon icon="ml-plus" color="#FFFFFF" />
  </MlButton>
</view>`
    },
    {
      templateCode: `<view class="button-container">
  <MlButton type="primary" size="mini">
    Mini
  </MlButton>
  <MlButton type="primary" size="small">
    Small
  </MlButton>
  <MlButton type="primary" size="medium">
    Medium
  </MlButton>
  <MlButton type="primary" size="large">
    Large
  </MlButton>
</view>`
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
