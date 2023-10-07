<template>
  <view :class="prefix">
    <MlNavigator
      :title="`${activeId} chart`"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view :class="`${prefix}-wrapper`" :style="wrapperStyle">
      <template
        v-if="settings[`${activeId}Settings`] && settings[`${activeId}Settings`].length > 0"
      >
        <CodeBlock
          v-for="chart in settings[`${activeId}Settings`]"
          :key="chart.title"
          :code="chart.optionString"
        >
          <template #title>
            <text>{{ chart.title }}</text>
          </template>
          <template #description>
            <text>{{ chart.description }}</text>
          </template>
          <template #demo>
            <view class="chart-wrapper">
              <lEchart ref="chartRef" :option="chart.option"></lEchart>
            </view>
          </template>
        </CodeBlock>
      </template>
      <template v-else>
        <view class="empty-status"> 尚未添加该类型的 echarts 配置列表 </view>
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import CodeBlock from '@/components/CodeBlock/index.vue'
  import lEchart from '@/uni_modules/lime-echart/components/lime-echart/MlEcharts.vue'
  import { lineSettings, pieSettings, histogramSettings, scatterSettings } from '../constants'
  import type { EchartsExampleType } from '../interface'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })
  const prefix = 'echarts-detail'

  const activeId = ref<string>('')
  const settings = ref<Record<`${string}Settings`, EchartsExampleType[]>>({
    defaultSettings: [],
    lineSettings,
    pieSettings,
    histogramSettings,
    scatterSettings
  })

  onLoad((options) => {
    if (!options) return
    const { id } = options
    activeId.value = (id && id.split('-')[1]) || 'default'
  })
</script>

<style lang="less">
  @import './index.less';
</style>
