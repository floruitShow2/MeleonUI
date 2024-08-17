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
      <!-- 年份选择器 -->
      <CodeBlock :code="templateMap[0].code">
        <template #title>
          <text>年份选择器</text>
        </template>
        <template #description>
          <text></text>
        </template>
        <template #demo>
          <view class="cell-container">
            <ml-datetime-picker
              v-model="templateMap[0].value"
              mode="year"
              :disabled-date="isDateDisabled"
              style="width: 100%"
              @change="handleValueChange"
            >
              <template #trigger>
                <ml-cell
                  label="年份选择器"
                  :value="formatToDateTime(templateMap[0].value)"
                  style="width: 100%"
                ></ml-cell>
              </template>
            </ml-datetime-picker>
          </view>
        </template>
      </CodeBlock>
      <!-- 月份选择器 -->
      <CodeBlock :code="templateMap[1].code">
        <template #title>
          <text>月份选择器</text>
        </template>
        <template #description>
          <text></text>
        </template>
        <template #demo>
          <view class="cell-container">
            <ml-datetime-picker
              v-model="templateMap[1].value"
              mode="month"
              :disabled-date="isDateDisabled"
              style="width: 100%"
              @change="handleValueChange"
            >
              <template #trigger>
                <ml-cell
                  label="月份选择器"
                  :value="formatToDateTime(templateMap[1].value)"
                  style="width: 100%"
                ></ml-cell>
              </template>
            </ml-datetime-picker>
          </view>
        </template>
      </CodeBlock>
      <!-- 日期选择器 -->
      <CodeBlock :code="templateMap[2].code">
        <template #title>
          <text>日期选择器</text>
        </template>
        <template #description>
          <text></text>
        </template>
        <template #demo>
          <view class="cell-container">
            <ml-datetime-picker
              v-model="templateMap[2].value"
              mode="date"
              :disabled-date="isDateDisabled"
              style="width: 100%"
              @change="handleValueChange"
            >
              <template #trigger>
                <ml-cell
                  label="日期选择器"
                  :value="formatToDateTime(templateMap[2].value)"
                  style="width: 100%"
                ></ml-cell>
              </template>
            </ml-datetime-picker>
          </view>
        </template>
      </CodeBlock>
      <!-- 时间选择器 -->
      <CodeBlock :code="templateMap[3].code">
        <template #title>
          <text>时间选择器</text>
        </template>
        <template #description>
          <text></text>
        </template>
        <template #demo>
          <view class="cell-container">
            <ml-time-picker v-model="templateMap[2].value" style="width: 100%">
              <template #trigger>
                <ml-cell
                  label="时间选择器"
                  :value="formatToDateTime(templateMap[3].value)"
                  style="width: 100%"
                ></ml-cell>
              </template>
            </ml-time-picker>
          </view>
        </template>
      </CodeBlock>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
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

  const handleValueChange = () => {
    console.log('change')
  }

  const isDateDisabled = (current: Date) => {
    return current.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000
  }

  const templateMap = ref([
    {
      code: '',
      value: new Date()
    },
    {
      code: '',
      value: new Date()
    },
    {
      code: '',
      value: new Date()
    },
    {
      code: '',
      value: new Date()
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
