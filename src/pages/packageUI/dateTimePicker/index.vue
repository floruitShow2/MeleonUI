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
            <ml-datetime-picker v-model="selectedDateTime" style="width: 100%">
              <template #trigger>
                <ml-cell
                  label="时间选择器"
                  :value="formatToDateTime(selectedDateTime)"
                  style="width: 100%"
                  @click="handleCellClick"
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
  const drawerVisible = ref<boolean>(false)
  const handleCellClick = () => {
    drawerVisible.value = true
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
