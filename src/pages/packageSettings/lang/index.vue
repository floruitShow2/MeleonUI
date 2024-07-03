<template>
  <view class="locale-selector">
    <ml-navigator
      title="locale"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="locale-selector-wrapper" :style="wrapperStyle">
      <view
        v-for="(label, locale) in mapLang"
        :key="locale"
        class="select-item"
        @click="selectedLocale = locale"
      >
        <text>{{ label }}</text>
        <ml-icon v-show="selectedLocale === locale" name="ml-selected" :size="22" color="#A0E548" />
      </view>
      <ml-button type="primary" size="medium" style="width: 100%" @click="handleLocaleChange">
        确认选择
      </ml-button>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useAppStore } from '@/store'
  import type { AppState } from '@/store/modules/app/type'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const mapLang = ref<Record<AppState['locale'], string>>({
    'zh-CN': '简体中文',
    'en-US': 'English'
  })
  const selectedLocale = ref<AppState['locale']>('zh-CN')

  onMounted(() => {
    selectedLocale.value = appStore.appLocale
  })

  const handleLocaleChange = async () => {
    appStore.toggleLocale(selectedLocale.value)
    uni.reLaunch({
      url: '/pages/home/index'
    })
  }
</script>

<style lang="less">
  @import './index.less';
</style>
