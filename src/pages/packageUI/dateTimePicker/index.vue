<template>
  <view class="button-view">
    <ml-navigator
      title="ml-cell"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background="#7A98B3"
    />
    <view class="button-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].code">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text></text>
        </template>
        <template #demo>
          <view class="cell-container">
            <ml-datetime-picker
              v-model="selectedDateTime"
              :mode="pickerMode"
              :disabled-date="isDateDisabled"
              style="width: 100%"
              @change="handleValueChange"
            >
              <template #trigger>
                <ml-cell
                  label="时间选择器"
                  :value="formatToDateTime(selectedDateTime)"
                  style="width: 100%"
                ></ml-cell>
              </template>
            </ml-datetime-picker>
          </view>
        </template>
      </CodeBlock>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { DatetimePickerProps } from '@/ml-ui'
  import { useAppStore } from '@/store'
  import CodeBlock from '@/components/CodeBlock/index.vue'
  import { formatToDateTime } from '@/utils/time'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const selectedDateTime = ref<Date>(new Date())
  const handleValueChange = () => {
    console.log('change', selectedDateTime.value)
  }

  const pickerMode = ref<DatetimePickerProps['mode']>('date')
  const isDateDisabled = (current: Date) => {
    return current.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000
  }

  const templateMap = ref([
    {
      code: ''
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
