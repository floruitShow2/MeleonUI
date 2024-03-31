<template>
  <view class="progress-view">
    <MlNavigator
      title="MlProgress"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="progress-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text>
            简单的进度条。
          </text>
        </template>
        <template #demo>
          <view class="button-container">
            <MlButton type="primary" @click="handlePlus(0)"> 加 10% </MlButton>
            <MlButton type="secondary" @click="handleSub(0)"> 减 10% </MlButton>
          </view>
          <view>
            <MlProgress :percent="templateMap[0].percent" :width="120" />
            <MlProgress :percent="templateMap[0].percent">
              <template #text="{ percent, decimal }">
                <text>进度 {{ (percent * 100).toFixed(decimal) }}%</text>
              </template>
            </MlProgress>
          </view>
        </template>
      </CodeBlock>
      <!-- 状态 -->
      <CodeBlock :code="templateMap[1].templateCode">
        <template #title>
          <text>进度条状态</text>
        </template>
        <template #description>
          <text>
            通过 status 指定进度条状态
          </text>
        </template>
        <template #demo>
          <view class="button-container">
            <MlButton type="primary" @click="handlePlus(1)"> 加 10% </MlButton>
            <MlButton type="secondary" @click="handleSub(1)"> 减 10% </MlButton>
          </view>
          <view>
            <MlProgress :percent="templateMap[1].percent" status="primary" />
            <MlProgress :percent="templateMap[1].percent" status="success" />
            <MlProgress :percent="templateMap[1].percent" status="warning" />
            <MlProgress :percent="templateMap[1].percent" status="danger" />
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
  import MlButton from '@/ml-ui/lib/ml-button/index.vue'
  import MlProgress from '@/ml-ui/lib/ml-progress/index.vue'
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
      percent: 0.1,
      templateCode: `<MlProgress :percent="templateMap[0].percent" :width="120" />
<MlProgress :percent="templateMap[0].percent">
  <template #text="{ percent, decimal }">
    <text>进度 {{ (percent * 100).toFixed(decimal) }}%</text>
  </template>
</MlProgress>`
    },
    {
      percent: 0.1,
      templateCode: `<MlProgress :percent="templateMap[0].percent" :width="120" />
<MlProgress :percent="templateMap[0].percent">
  <template #text="{ percent, decimal }">
    <text>进度 {{ (percent * 100).toFixed(decimal) }}%</text>
  </template>
</MlProgress>`
    }
  ])

  const handlePlus = (index: number) => {
    if (templateMap.value[index].percent <= 0.9) {
      const newItem = {
        ...templateMap.value[index],
        percent: templateMap.value[index].percent + 0.1
      }
      templateMap.value.splice(index, 1, newItem)
    }
  }

  const handleSub = (index: number) => {
    if (templateMap.value[index].percent > 0) {
      const newItem = {
        ...templateMap.value[index],
        percent: templateMap.value[index].percent - 0.1
      }
      templateMap.value.splice(index, 1, newItem)
    }
  }
</script>

<style lang="less">
  @import './index.less';
</style>
