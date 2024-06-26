<template>
  <view class="button-view">
    <MlNavigator
      title="ml-button"
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
            <ml-button type="primary">Primary</ml-button>
            <ml-button>Secondary</ml-button>
            <ml-button type="outline">Outline</ml-button>
            <ml-button type="text">Text</ml-button>
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
            <ml-button type="primary" shape="square">Square</ml-button>
            <ml-button type="primary" shape="round">Round</ml-button>
            <ml-button type="primary" shape="square">
              <template #icon>
                <ml-icon name="ml-plus" color="#FFFFFF" />
              </template>
            </ml-button>
            <ml-button type="primary" shape="circle">
              <ml-icon name="ml-plus" color="#FFFFFF" />
            </ml-button>
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
            <ml-button type="primary" size="mini">Mini</ml-button>
            <ml-button type="primary" size="small">Small</ml-button>
            <ml-button type="primary" size="medium">Medium</ml-button>
            <ml-button type="primary" size="large">Large</ml-button>
          </view>
        </template>
      </CodeBlock>
      <!-- 按钮尺寸 -->
      <CodeBlock :code="templateMap[3].templateCode">
        <template #title>
          <text>按钮状态</text>
        </template>
        <template #description>
          <text>
            按钮状态分为 warning, danger, success 三种，可以与按钮类型同时生效，优先级高于按钮类型。
          </text>
        </template>
        <template #demo>
          <view class="button-container">
            <view class="button-container">
              <ml-button type="primary" size="mini" status="success">Primary</ml-button>
              <ml-button size="mini" status="success">Secondary</ml-button>
              <ml-button type="outline" size="mini" status="success">Outline</ml-button>
              <ml-button type="text" size="mini" status="success">Text</ml-button>
            </view>
            <view class="button-container">
              <ml-button type="primary" size="mini" status="warning">Primary</ml-button>
              <ml-button size="mini" status="warning">Secondary</ml-button>
              <ml-button type="outline" size="mini" status="warning">Outline</ml-button>
              <ml-button type="text" size="mini" status="warning">Text</ml-button>
            </view>
            <view class="button-container">
              <ml-button loading type="primary" size="mini" status="danger">Primary</ml-button>
              <ml-button size="mini" status="danger">Secondary</ml-button>
              <ml-button type="outline" size="mini" status="danger">Outline</ml-button>
              <ml-button type="text" size="mini" status="danger">Text</ml-button>
            </view>
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
    <ml-button type="primary">Primary</ml-button>
    <ml-button>Secondary</ml-button>
    <ml-button type="outline">Outline</ml-button>
    <ml-button type="text">Text</ml-button>
</view>`
    },
    {
      templateCode: `<view class="button-container">
  <ml-button type="primary" shape="square">Square</ml-button>
  <ml-button type="primary" shape="round">Round</ml-button>
  <ml-button type="primary" shape="square">
    <template #icon>
      <ml-icon name="ml-plus" color="#FFFFFF" />
    </template>
  </ml-button>
  <ml-button type="primary" shape="circle">
    <ml-icon name="ml-plus" color="#FFFFFF" />
  </ml-button>
</view>`
    },
    {
      templateCode: `<view class="button-container">
  <ml-button type="primary" size="mini">
    Mini
  </ml-button>
  <ml-button type="primary" size="small">
    Small
  </ml-button>
  <ml-button type="primary" size="medium">
    Medium
  </ml-button>
  <ml-button type="primary" size="large">
    Large
  </ml-button>
</view>`
    },
    {
      templateCode: `<view class="button-container">
    <ml-button
        type="primary"
        size="mini"
        status="success"
    >
        Primary
    </ml-button>
    <ml-button
        size="mini"
        status="success"
    >
        Secondary
    </ml-button>
    <ml-button
        type="outline"
        size="mini"
        status="success"
    >
        Outline
    </ml-button>
    <ml-button
        type="text"
        size="mini"
        status="success"
    >
        Text
    </ml-button>
</view>
<view class="button-container">
    <ml-button
        type="primary"
        size="mini"
        status="warning"
    >
        Primary
    </ml-button>
    <ml-button
        size="mini"
        status="warning"
    >
        Secondary
    </ml-button>
    <ml-button
        type="outline"
        size="mini"
        status="warning"
    >
        Outline
    </ml-button>
    <ml-button
        type="text"
        size="mini"
        status="warning"
    >
        Text
    </ml-button>
</view>
<view class="button-container">
    <ml-button
        type="primary"
        size="mini"
        status="danger"
    >
        Primary
    </ml-button>
    <ml-button
        size="mini"
        status="danger"
    >
        Secondary
    </ml-button>
    <ml-button
        type="outline"
        size="mini"
        status="danger"
    >
        Outline
    </ml-button>
    <ml-button
        type="text"
        size="mini"
        status="danger"
    >
        Text
    </ml-button>
</view>`
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
