<template>
  <view class="components-container">
    <MlNavigator
      title="MeleonUI"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view
      class="components-container-list"
      :style="{
        height: `${ui.contentHeight + ui.tabbarHeight + ui.bottomBarHeight}px`
      }"
    >
      <view v-for="item in componentList" :key="item.name" class="bar" @click="onNavigate(item)">
        {{ item.name }}
        <MlIcon icon="ml-arrow-right" color="#808080" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlIcon from '@/ml-ui/lib/ml-icon/index.vue'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'

  const appStore = useAppStore()
  const ui = computed(() => {
    return appStore.appSize
  })

  interface ComponentItemType {
    name: string
    path: string
  }
  const componentList = ref<ComponentItemType[]>([
    { name: 'ml-icon', path: '/pages/packageUI/icon/index' },
    { name: 'ml-button', path: '/pages/packageUI/button/index' },
    { name: 'ml-avatar', path: '/pages/packageUI/avatar/index' },
    { name: 'ml-input', path: '/pages/packageUI/input/index' },
    { name: 'ml-input-tag', path: '/pages/packageUI/inputTag/index' },
    { name: 'ml-tabs', path: '/pages/packageUI/tabs/index' },
    { name: 'ml-tag', path: '/pages/packageUI/tag/index' },
    { name: 'ml-select', path: '/pages/packageUI/select/index' },
    { name: 'ml-checkbox', path: '../../package-WsUI/pages/checkbox/checkbox' },
    { name: 'ml-swiper-cell', path: '../../package-WsUI/pages/swiperCell/swiperCell' },
    { name: 'ml-table', path: '../../package-WsUI/pages/table/table' },
    { name: 'ml-timeline', path: '../../package-WsUI/pages/timeline/timeline' }
  ])

  const onNavigate = (item: ComponentItemType) => {
    console.log(item)
    uni.navigateTo({
      url: item.path
    })
  }
</script>

<style lang="less">
  @import './index.less';
</style>
