<template>
  <view class="count-to-view">
    <MlNavigator
      title="ml-button"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="count-to-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text>
            当需要突出某个或某组数字或展示带描述的统计类数据时使用，可设置 show-seperator
            属性控制是否显示分隔符
          </text>
        </template>
        <template #demo>
          <view class="count-to-container">
            <ml-count-to :from="0" :to="36241250.44" />
            <ml-count-to :from="0" :to="36241250.44" show-seperator />
          </view>
        </template>
      </CodeBlock>
      <!-- 数值动画 -->
      <CodeBlock :code="templateMap[1].templateCode">
        <template #title>
          <text>数值动画</text>
        </template>
        <template #description>
          <text>
            通过 animation 可以开启数值动画，通过 animation-duration 可以设置动画持续时间。
          </text>
        </template>
        <template #demo>
          <view class="count-to-container">
            <ml-count-to :from="0" :to="1250.44" animation :animation-duration="5000" />
            <ml-count-to :from="0" :to="36241250.44" animation show-seperator />
          </view>
        </template>
      </CodeBlock>
      <!-- 前后缀 -->
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>数值前后缀</text>
        </template>
        <template #description>
          <text> 分别提供了 prefix 和 suffix 插槽来设置数值的前缀和后缀 </text>
        </template>
        <template #demo>
          <view class="count-to-container">
            <ml-count-to :from="0" :to="1250.44" animation :animation-duration="5000">
              <template #prefix>
                <MlIcon name="ml-arrow-up" />
              </template>
            </ml-count-to>
            <ml-count-to
              :from="0"
              :to="1250.44"
              animation
              :animation-duration="5000"
              :value-style="{ color: '#0fbf60' }"
            >
              <template #suffix>
                <text>%</text>
              </template>
            </ml-count-to>
          </view>
        </template>
      </CodeBlock>
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>手动触发</text>
        </template>
        <template #description>
          <text> 可以选择手动触发动画，组件暴露了 start、pause、restart 方法共用户使用 </text>
        </template>
        <template #demo>
          <view class="count-to-container">
            <ml-count-to
              ref="countToRef"
              :from="0"
              :to="1250.44"
              :animation-duration="5000"
              :value-style="{ color: '#0fbf60' }"
            >
              <template #suffix>
                <text>%</text>
              </template>
            </ml-count-to>
            <view class="button-list">
              <ml-button type="primary" size="mini" @click="handleStartClick"> start </ml-button>
              <ml-button type="primary" size="mini" status="danger" @click="handlePauseClick">
                pause
              </ml-button>
              <ml-button type="primary" size="mini" status="success" @click="handleRestartClick">
                restart
              </ml-button>
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
  import MlIcon from '@/ml-ui/lib/ml-icon/index.vue'
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
      templateCode: ``
    },
    {
      templateCode: ``
    },
    {
      templateCode: ``
    },
    {
      templateCode: ``
    }
  ])

  const countToRef = ref()
  const handleStartClick = () => {
    countToRef.value.start()
  }
  const handlePauseClick = () => {
    countToRef.value.pause()
  }
  const handleRestartClick = () => {
    countToRef.value.restart()
  }
</script>

<style lang="less">
  @import './index.less';
</style>
