<template>
  <view class="progress-view">
    <MlNavigator
      title="ml-progress"
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
          <text> 简单的进度条。 </text>
        </template>
        <template #demo>
          <view class="button-container">
            <ml-button type="primary" @click="handlePlus(0)"> 加 10% </ml-button>
            <ml-button type="secondary" @click="handleSub(0)"> 减 10% </ml-button>
          </view>
          <view>
            <ml-progress :percent="templateMap[0].percent" :width="120" />
            <ml-progress :percent="templateMap[0].percent">
              <template #text="{ percent, decimal }">
                <text>进度 {{ (percent * 100).toFixed(decimal) }}%</text>
              </template>
            </ml-progress>
          </view>
        </template>
      </CodeBlock>
      <!-- 状态 -->
      <CodeBlock :code="templateMap[1].templateCode">
        <template #title>
          <text>进度条状态</text>
        </template>
        <template #description>
          <text> 通过 status 指定进度条状态 </text>
        </template>
        <template #demo>
          <view class="button-container">
            <ml-button type="primary" @click="handlePlus(1)"> 加 10% </ml-button>
            <ml-button type="secondary" @click="handleSub(1)"> 减 10% </ml-button>
          </view>
          <view>
            <ml-progress :percent="templateMap[1].percent" status="primary" />
            <ml-progress :percent="templateMap[1].percent" status="success" />
            <ml-progress :percent="templateMap[1].percent" status="warning" />
            <ml-progress :percent="templateMap[1].percent" status="danger" />
          </view>
        </template>
      </CodeBlock>
      <!-- 环形进度条 -->
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>环形进度条</text>
        </template>
        <template #description>
          <text> 设置 type="circle" 将会展示环形进度条。 </text>
        </template>
        <template #demo>
          <view class="button-container">
            <ml-button type="primary" @click="handlePlus(2)"> 加 10% </ml-button>
            <ml-button type="secondary" @click="handleSub(2)"> 减 10% </ml-button>
          </view>
          <view class="progress-wrapper">
            <ml-progress :percent="templateMap[2].percent" type="circle" status="primary" />
            <ml-progress :percent="templateMap[2].percent" type="circle" status="success" />
            <ml-progress :percent="templateMap[2].percent" type="circle" status="warning" />
            <ml-progress :percent="templateMap[2].percent" type="circle" status="danger" />
          </view>
        </template>
      </CodeBlock>
      <!-- 环形进度条 -->
      <CodeBlock :code="templateMap[3].templateCode">
        <template #title>
          <text>进度条尺寸</text>
        </template>
        <template #description>
          <text> 通过 size 设置进度条的大小。 </text>
        </template>
        <template #demo>
          <view class="button-container">
            <ml-button
              :type="curSize === 'small' ? 'primary' : 'secondary'"
              @click="() => changeSize('small')"
            >
              Small
            </ml-button>
            <ml-button
              :type="curSize === 'medium' ? 'primary' : 'secondary'"
              @click="() => changeSize('medium')"
            >
              Medium
            </ml-button>
            <ml-button
              :type="curSize === 'large' ? 'primary' : 'secondary'"
              @click="() => changeSize('large')"
            >
              Large
            </ml-button>
          </view>
          <view>
            <ml-progress :percent="templateMap[3].percent" :size="curSize" status="primary" />
            <ml-progress :percent="templateMap[3].percent" :size="curSize" status="success" />
          </view>
          <view class="progress-wrapper">
            <ml-progress
              :percent="templateMap[3].percent"
              type="circle"
              :size="curSize"
              status="primary"
            />
            <ml-progress
              :percent="templateMap[3].percent"
              type="circle"
              :size="curSize"
              status="success"
            />
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
      percent: 0.1,
      templateCode: `<ml-progress :percent="templateMap[0].percent" :width="120" />
<ml-progress :percent="templateMap[0].percent">
  <template #text="{ percent, decimal }">
    <text>进度 {{ (percent * 100).toFixed(decimal) }}%</text>
  </template>
</ml-progress>`
    },
    {
      percent: 0.1,
      templateCode: `<ml-progress :percent="templateMap[0].percent" :width="120" />
<ml-progress :percent="templateMap[0].percent">
  <template #text="{ percent, decimal }">
    <text>进度 {{ (percent * 100).toFixed(decimal) }}%</text>
  </template>
</ml-progress>`
    },
    {
      percent: 0.1,
      templateCode: `<ml-progress :percent="templateMap[0].percent" :width="120" />
<ml-progress :percent="templateMap[0].percent">
  <template #text="{ percent, decimal }">
    <text>进度 {{ (percent * 100).toFixed(decimal) }}%</text>
  </template>
</ml-progress>`
    },
    {
      percent: 0.75,
      templateCode: `<ml-progress :percent="templateMap[0].percent" :width="120" />
<ml-progress :percent="templateMap[0].percent">
  <template #text="{ percent, decimal }">
    <text>进度 {{ (percent * 100).toFixed(decimal) }}%</text>
  </template>
</ml-progress>`
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

  const curSize = ref<MlDesign.Size>('small')
  const changeSize = (size: MlDesign.Size) => {
    curSize.value = size
  }

  const handleDrawStart = () => {
    console.log('start')
  }
  const handleDrawEnd = (progress: number) => {
    console.log('progress', progress)
  }
  const handleDrawProgress = () => {
    console.log('end')
  }
</script>

<style lang="less">
  @import './index.less';
</style>
