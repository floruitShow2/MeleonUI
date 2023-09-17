<template>
  <view class="effect-particle">
    <MlNavigator
      title="Particle"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="effect-wrapper" :style="wrapperStyle">
      <view class="load">
        <view class="load-item load-item-1"></view>
        <view class="load-item load-item-2"></view>
        <view class="load-item load-item-3"></view>
        <view class="load-item load-item-4"></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'

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
