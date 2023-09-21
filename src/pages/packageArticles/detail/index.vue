<template>
  <view class="article-view">
    <MlNavigator
      title="MeleonUI"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="article-view-wrapper" :style="wrapperStyle">
      <UAMarkdown :source="htmlContent"></UAMarkdown>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import UAMarkdown from '@/components/ua-markdown/ua-markdown.vue'
  import { findArticleById } from './database'
  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const htmlContent = ref('')
  onLoad((options) => {
    if (!options) return
    const { id } = options
    htmlContent.value = findArticleById(id)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
