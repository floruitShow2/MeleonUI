<template>
  <view class="uni_class">
    <MlNavigator
      title="MeleonUI"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="view-wrapper" :style="wrapperStyle">
      <MlTabs :active="1">
        <MlTab key="aaa" title="aaa" />
        <MlTab key="bbb" title="bbb" />
        <MlTab key="ccc" title="ccc" />
      </MlTabs>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlTab from '@/ml-ui/lib/ml-tab/index.vue'
  import MlTabs from '@/ml-ui/lib/ml-tabs/index.vue'

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
