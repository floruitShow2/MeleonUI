<template>
  <view class="icon-view">
    <ml-navigator
      title="ml-icon"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="icon-view-wrapper" :style="wrapperStyle">
      <view v-for="icon in icons" :key="icon" class="icon-item">
        <ml-icon :name="icon" :size="24" color="#808080" />
        <text class="icon-name">{{ icon }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import IconSettings from './settings'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const icons = ref<string[]>([])

  const initIcons = () => {
    const { css_prefix_text, glyphs } = IconSettings
    icons.value = glyphs.map((item) => `${css_prefix_text}${item.font_class}`)
  }
  initIcons()
</script>

<style lang="less">
  @import './index.less';
</style>
