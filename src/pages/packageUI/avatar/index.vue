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
            <MlAvatar>Meleon</MlAvatar>
            <MlAvatar>Jeram blazeri</MlAvatar>
            <MlAvatar shape="circle">
              <image src="@/assets/home/avatar.png" mode="widthFix" />
            </MlAvatar>
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
            <MlAvatar :size="28">Meleon</MlAvatar>
            <MlAvatar :size="32">Meleon</MlAvatar>
            <MlAvatar :size="36">Meleon</MlAvatar>
            <MlAvatar :size="40">Meleon</MlAvatar>
          </view>
          <view class="avatar-container">
            <MlAvatar :size="28" shape="circle">Meleon</MlAvatar>
            <MlAvatar :size="32" shape="circle">Meleon</MlAvatar>
            <MlAvatar :size="36" shape="circle">Meleon</MlAvatar>
            <MlAvatar :size="40" shape="circle">Meleon</MlAvatar>
          </view>
        </template>
      </CodeBlock>
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>分组</text>
        </template>
        <template #description>
          <text>
            使用 MlAvatarGroup 可以使用头像组功能，可通过 size 指定头像的大小，通过 offset 指定
            Avatar 的偏移量。
          </text>
        </template>
        <template #demo>
          <view class="avatar-container">
            <MlAvatarGroup :size="36" :offset="10">
              <MlAvatar>Meleon</MlAvatar>
              <MlAvatar>Aliee</MlAvatar>
              <MlAvatar>Bob</MlAvatar>
            </MlAvatarGroup>
            <MlAvatarGroup :size="36" :offset="10" shape="circle">
              <MlAvatar>Meleon</MlAvatar>
              <MlAvatar>Aliee</MlAvatar>
              <MlAvatar>Bob</MlAvatar>
            </MlAvatarGroup>
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
            <MlAvatarGroup :max-count="2">
              <MlAvatar>Meleon</MlAvatar>
              <MlAvatar>Aliee</MlAvatar>
              <MlAvatar>Bob</MlAvatar>
              <MlAvatar>Civil</MlAvatar>
            </MlAvatarGroup>
            <MlAvatarGroup :max-count="2" :offset="20" shape="circle">
              <MlAvatar>Meleon</MlAvatar>
              <MlAvatar>Aliee</MlAvatar>
              <MlAvatar>Bob</MlAvatar>
              <MlAvatar>Civil</MlAvatar>
            </MlAvatarGroup>
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
  import MlAvatar from '@/ml-ui/lib/ml-avatar/index.vue'
  import MlAvatarGroup from '@/ml-ui/lib/ml-avatar-group/index.vue'
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
      templateCode: `<MlAvatar>Meleon</MlAvatar>
<MlAvatar>Jeram blazeri</MlAvatar>
<MlAvatar shape="circle">
  <image src="@/assets/home/avatar.png" mode="widthFix" />
</MlAvatar>`
    },
    {
      templateCode: `<view class="avatar-container">
  <MlAvatar :size="28">Meleon</MlAvatar>
  <MlAvatar :size="32">Meleon</MlAvatar>
  <MlAvatar :size="36">Meleon</MlAvatar>
  <MlAvatar :size="40">Meleon</MlAvatar>
</view>
<view class="avatar-container">
  <MlAvatar :size="28" shape="circle">Meleon</MlAvatar>
  <MlAvatar :size="32" shape="circle">Meleon</MlAvatar>
  <MlAvatar :size="36" shape="circle">Meleon</MlAvatar>
  <MlAvatar :size="40" shape="circle">Meleon</MlAvatar>
</view>`
    },
    {
      templateCode: `<MlAvatarGroup :size="36" :offset="10">
  <MlAvatar>Meleon</MlAvatar>
  <MlAvatar>Aliee</MlAvatar>
  <MlAvatar>Bob</MlAvatar>
</MlAvatarGroup>
<MlAvatarGroup :size="36" :offset="10" shape="circle">
  <MlAvatar>Meleon</MlAvatar>
  <MlAvatar>Aliee</MlAvatar>
  <MlAvatar>Bob</MlAvatar>
</MlAvatarGroup>`
    },
    {
      templateCode: `<MlAvatarGroup :max-count="2">
  <MlAvatar>Meleon</MlAvatar>
  <MlAvatar>Aliee</MlAvatar>
  <MlAvatar>Bob</MlAvatar>
  <MlAvatar>Civil</MlAvatar>
</MlAvatarGroup>
<MlAvatarGroup :max-count="2" :offset="20" shape="circle">
  <MlAvatar>Meleon</MlAvatar>
  <MlAvatar>Aliee</MlAvatar>
  <MlAvatar>Bob</MlAvatar>
  <MlAvatar>Civil</MlAvatar>
</MlAvatarGroup>`
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
