<template>
  <view class="avatar-view">
    <MlNavigator
      title="Profile"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="avatar-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text>
            ml-avatar 组件的基础用法，如果头像是文字的话，会自动调节字体大小，来适应头像框。
          </text>
        </template>
        <template #demo>
          <view class="avatar-container">
            <ml-avatar>Meleon</ml-avatar>
            <ml-avatar>Jeram blazeri</ml-avatar>
            <ml-avatar shape="circle">
              <image src="@/assets/home/avatar.png" mode="widthFix" />
            </ml-avatar>
          </view>
        </template>
      </CodeBlock>
      <!-- 大小和形状 -->
      <CodeBlock :code="templateMap[1].templateCode">
        <template #title>
          <text>大小和形状</text>
        </template>
        <template #description>
          <view>
            size 字段的值推荐按照 28px(mini)、32px(small)、36px(medium)、40px(large) 的规范
            设置头像尺寸，默认为 32px。
          </view>
          <view> 设置 shape 字段，可以设置头像是圆形 (circle) 还是正方形 (square) </view>
        </template>
        <template #demo>
          <view class="avatar-container">
            <ml-avatar :size="28">Meleon</ml-avatar>
            <ml-avatar :size="32">Meleon</ml-avatar>
            <ml-avatar :size="36">Meleon</ml-avatar>
            <ml-avatar :size="40">Meleon</ml-avatar>
          </view>
          <view class="avatar-container">
            <ml-avatar :size="28" shape="circle">Meleon</ml-avatar>
            <ml-avatar :size="32" shape="circle">Meleon</ml-avatar>
            <ml-avatar :size="36" shape="circle">Meleon</ml-avatar>
            <ml-avatar :size="40" shape="circle">Meleon</ml-avatar>
          </view>
        </template>
      </CodeBlock>
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>分组</text>
        </template>
        <template #description>
          <text>
            使用 ml-avatar-group 可以使用头像组功能，可通过 size 指定头像的大小，通过 offset 指定
            Avatar 的偏移量。
          </text>
        </template>
        <template #demo>
          <view class="avatar-container">
            <ml-avatar-group :size="36" :offset="10">
              <ml-avatar>Meleon</ml-avatar>
              <ml-avatar>Aliee</ml-avatar>
              <ml-avatar>Bob</ml-avatar>
            </ml-avatar-group>
            <ml-avatar-group :size="36" :offset="10" shape="circle">
              <ml-avatar>Meleon</ml-avatar>
              <ml-avatar>Aliee</ml-avatar>
              <ml-avatar>Bob</ml-avatar>
            </ml-avatar-group>
          </view>
        </template>
      </CodeBlock>
      <CodeBlock :code="templateMap[3].templateCode">
        <template #title>
          <text>限制分组数量</text>
        </template>
        <template #description>
          <text> 通过 max-count 属性限制分组展示的头像数量 </text>
        </template>
        <template #demo>
          <view class="avatar-container">
            <ml-avatar-group :max-count="2">
              <ml-avatar>Meleon</ml-avatar>
              <ml-avatar>Aliee</ml-avatar>
              <ml-avatar>Bob</ml-avatar>
              <ml-avatar>Civil</ml-avatar>
            </ml-avatar-group>
            <ml-avatar-group :max-count="2" :offset="20" shape="circle">
              <ml-avatar>Meleon</ml-avatar>
              <ml-avatar>Aliee</ml-avatar>
              <ml-avatar>Bob</ml-avatar>
              <ml-avatar>Civil</ml-avatar>
            </ml-avatar-group>
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
      templateCode: `<ml-avatar>Meleon</ml-avatar>
<ml-avatar>Jeram blazeri</ml-avatar>
<ml-avatar shape="circle">
  <image src="@/assets/home/avatar.png" mode="widthFix" />
</ml-avatar>`
    },
    {
      templateCode: `<view class="avatar-container">
  <ml-avatar :size="28">Meleon</ml-avatar>
  <ml-avatar :size="32">Meleon</ml-avatar>
  <ml-avatar :size="36">Meleon</ml-avatar>
  <ml-avatar :size="40">Meleon</ml-avatar>
</view>
<view class="avatar-container">
  <ml-avatar :size="28" shape="circle">Meleon</ml-avatar>
  <ml-avatar :size="32" shape="circle">Meleon</ml-avatar>
  <ml-avatar :size="36" shape="circle">Meleon</ml-avatar>
  <ml-avatar :size="40" shape="circle">Meleon</ml-avatar>
</view>`
    },
    {
      templateCode: `<ml-avatar-group :size="36" :offset="10">
  <ml-avatar>Meleon</ml-avatar>
  <ml-avatar>Aliee</ml-avatar>
  <ml-avatar>Bob</ml-avatar>
</ml-avatar-group>
<ml-avatar-group :size="36" :offset="10" shape="circle">
  <ml-avatar>Meleon</ml-avatar>
  <ml-avatar>Aliee</ml-avatar>
  <ml-avatar>Bob</ml-avatar>
</ml-avatar-group>`
    },
    {
      templateCode: `<ml-avatar-group :max-count="2">
  <ml-avatar>Meleon</ml-avatar>
  <ml-avatar>Aliee</ml-avatar>
  <ml-avatar>Bob</ml-avatar>
  <ml-avatar>Civil</ml-avatar>
</ml-avatar-group>
<ml-avatar-group :max-count="2" :offset="20" shape="circle">
  <ml-avatar>Meleon</ml-avatar>
  <ml-avatar>Aliee</ml-avatar>
  <ml-avatar>Bob</ml-avatar>
  <ml-avatar>Civil</ml-avatar>
</ml-avatar-group>`
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
