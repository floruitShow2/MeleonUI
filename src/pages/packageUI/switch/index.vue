<template>
  <view class="uni_class">
    <ml-navigator
      title="ml-switch"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background="#7A98B3"
    />
    <view class="view-wrapper" :style="wrapperStyle"></view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })
</script>

<style lang="less">
  @import './index.less';
</style>