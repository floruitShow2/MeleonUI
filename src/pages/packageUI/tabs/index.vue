<template>
  <view class="tabs-view">
    <ml-navigator
      title="ml-tabs"
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
          <ml-tabs active="a">
            <ml-tab value="a" title="标签1">内容1</ml-tab>
            <ml-tab value="b" title="标签2">内容2</ml-tab>
            <ml-tab value="c" title="标签3">内容3</ml-tab>
            <ml-tab value="d" title="标签4">内容4</ml-tab>
            <ml-tab value="e" title="标签5">内容5</ml-tab>
          </ml-tabs>
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
          <ml-tabs active="a">
            <ml-tab value="a" title="标签1" closable>内容1</ml-tab>
            <ml-tab value="b" title="标签2" disabled>内容2</ml-tab>
            <ml-tab value="c" title="标签3" disabled closable>内容3</ml-tab>
            <ml-tab value="d" title="标签4">内容4</ml-tab>
            <ml-tab value="e" title="标签5">内容5</ml-tab>
          </ml-tabs>
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
          <ml-tabs active="a" :scroll-with-animation="false">
            <ml-tab value="a" title="标签1">内容1</ml-tab>
            <ml-tab value="b" title="标签2">内容2</ml-tab>
            <ml-tab value="c" title="标签3">内容3</ml-tab>
            <ml-tab value="d" title="标签4">内容4</ml-tab>
            <ml-tab value="e" title="标签5">内容5</ml-tab>
          </ml-tabs>
        </template>
      </CodeBlock>
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>添加 Icon</text>
        </template>
        <template #description>
          <text>在 ml-tab 组件上添加图标名称，目前必须使用 MlIcon 库内的图标，以 “ml-” 开头</text>
        </template>
        <template #demo>
          <ml-tabs active="a">
            <ml-tab value="a" title="标签1" name="ml-setting">内容1</ml-tab>
            <ml-tab value="b" title="标签2">内容2</ml-tab>
            <ml-tab value="c" title="标签3">内容3</ml-tab>
            <ml-tab value="d" title="标签4">内容4</ml-tab>
            <ml-tab value="e" title="标签5">内容5</ml-tab>
          </ml-tabs>
        </template>
      </CodeBlock>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
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
      templateCode: `<ml-tabs active="a" :scroll-with-animation="true">
  <ml-tab value="a" title="标签1">内容1</ml-tab>
  <ml-tab value="b" title="标签2">内容2</ml-tab>
  <ml-tab value="c" title="标签3">内容3</ml-tab>
  <ml-tab value="d" title="标签4">内容4</ml-tab>
  <ml-tab value="e" title="标签5">内容5</ml-tab>
</ml-tabs>`
    },
    {
      templateCode: `<ml-tabs active="a">
  <ml-tab value="a" title="标签1" closable>内容1</ml-tab>
  <ml-tab value="b" title="标签2" disabled>内容2</ml-tab>
  <ml-tab value="c" title="标签3" disabled closable>内容3</ml-tab>
  <ml-tab value="d" title="标签4">内容4</ml-tab>
  <ml-tab value="e" title="标签5">内容5</ml-tab>
</ml-tabs>`
    },
    {
      templateCode: `<ml-tabs active="a" :scroll-with-animation="false">
  <ml-tab value="a" title="标签1">内容1</ml-tab>
  <ml-tab value="b" title="标签2">内容2</ml-tab>
  <ml-tab value="c" title="标签3">内容3</ml-tab>
</ml-tabs>`
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
