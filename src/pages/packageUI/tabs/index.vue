<template>
  <view class="tabs-view">
    <MlNavigator
      title="MeleonUI"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="tabs-view-wrapper" :style="wrapperStyle">
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text>标签页的基本使用方法。</text>
        </template>
        <template #demo>
          <MlTabs active="a">
            <MlTab value="a" title="标签1">内容1</MlTab>
            <MlTab value="b" title="标签2">内容2</MlTab>
            <MlTab value="c" title="标签3">内容3</MlTab>
            <MlTab value="d" title="标签4">内容4</MlTab>
            <MlTab value="e" title="标签5">内容5</MlTab>
          </MlTabs>
        </template>
      </CodeBlock>
      <CodeBlock :code="templateMap[1].templateCode">
        <template #title>
          <text>禁用 / 移除标签</text>
        </template>
        <template #description>
          <text>通过设置 disabled 和 closable 属性来控制每个tab</text>
        </template>
        <template #demo>
          <MlTabs active="a">
            <MlTab value="a" title="标签1" closable>内容1</MlTab>
            <MlTab value="b" title="标签2" disabled>内容2</MlTab>
            <MlTab value="c" title="标签3" disabled closable>内容3</MlTab>
            <MlTab value="d" title="标签4">内容4</MlTab>
            <MlTab value="e" title="标签5">内容5</MlTab>
          </MlTabs>
        </template>
      </CodeBlock>
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>切换动画</text>
        </template>
        <template #description>
          <text>通过设置 scroll-with-animation 属性控制切换动画，默认开启</text>
        </template>
        <template #demo>
          <MlTabs active="a" :scroll-with-animation="false">
            <MlTab value="a" title="标签1">内容1</MlTab>
            <MlTab value="b" title="标签2">内容2</MlTab>
            <MlTab value="c" title="标签3">内容3</MlTab>
            <MlTab value="d" title="标签4">内容4</MlTab>
            <MlTab value="e" title="标签5">内容5</MlTab>
          </MlTabs>
        </template>
      </CodeBlock>
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>添加 Icon</text>
        </template>
        <template #description>
          <text>在 MlTab 组件上添加图标名称，目前必须使用 MlIcon 库内的图标，以 “ml-” 开头</text>
        </template>
        <template #demo>
          <MlTabs active="a">
            <MlTab value="a" title="标签1" icon="ml-setting">内容1</MlTab>
            <MlTab value="b" title="标签2">内容2</MlTab>
            <MlTab value="c" title="标签3">内容3</MlTab>
            <MlTab value="d" title="标签4">内容4</MlTab>
            <MlTab value="e" title="标签5">内容5</MlTab>
          </MlTabs>
        </template>
      </CodeBlock>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import CodeBlock from '@/components/CodeBlock/index.vue'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlTab from '@/ml-ui/lib/ml-tab/index.vue'
  import MlTabs from '@/ml-ui/lib/ml-tabs/index.vue'

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
      templateCode: `<MlTabs active="a" :scroll-with-animation="true">
  <MlTab value="a" title="标签1">内容1</MlTab>
  <MlTab value="b" title="标签2">内容2</MlTab>
  <MlTab value="c" title="标签3">内容3</MlTab>
  <MlTab value="d" title="标签4">内容4</MlTab>
  <MlTab value="e" title="标签5">内容5</MlTab>
</MlTabs>`
    },
    {
      templateCode: `<MlTabs active="a">
  <MlTab value="a" title="标签1" closable>内容1</MlTab>
  <MlTab value="b" title="标签2" disabled>内容2</MlTab>
  <MlTab value="c" title="标签3" disabled closable>内容3</MlTab>
  <MlTab value="d" title="标签4">内容4</MlTab>
  <MlTab value="e" title="标签5">内容5</MlTab>
</MlTabs>`
    },
    {
      templateCode: `<MlTabs active="a" :scroll-with-animation="false">
  <MlTab value="a" title="标签1">内容1</MlTab>
  <MlTab value="b" title="标签2">内容2</MlTab>
  <MlTab value="c" title="标签3">内容3</MlTab>
</MlTabs>`
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
