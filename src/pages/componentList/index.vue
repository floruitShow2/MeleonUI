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
        <MlIcon name="ml-arrow-right" color="#808080" />
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
    { name: 'ml-avatar', path: '/pages/packageUI/avatar/index' },
    { name: 'ml-button', path: '/pages/packageUI/button/index' },
    { name: 'ml-cell', path: '/pages/packageUI/cell/index' },
    { name: 'ml-checkbox', path: '/pages/packageUI/checkbox/index' },
    { name: 'ml-count-to', path: '/pages/packageUI/countTo/index' },
    { name: 'ml-drawer', path: '/pages/packageUI/drawer/index' },
    { name: 'ml-icon', path: '/pages/packageUI/icon/index' },
    { name: 'ml-input', path: '/pages/packageUI/input/index' },
    { name: 'ml-input-tag', path: '/pages/packageUI/inputTag/index' },
    { name: 'ml-message', path: '/pages/packageUI/message/index' },
    { name: 'ml-progress', path: '/pages/packageUI/progress/index' },
    { name: 'ml-swiper-cell', path: '../../package-WsUI/pages/swiperCell/swiperCell' },
    { name: 'ml-select', path: '/pages/packageUI/select/index' },
    { name: 'ml-tabs', path: '/pages/packageUI/tabs/index' },
    { name: 'ml-tag', path: '/pages/packageUI/tag/index' },
    { name: 'ml-table', path: '/pages/packageUI/table/index' },
    { name: 'ml-timeline', path: '/pages/packageUI/timeline/index' },
    { name: 'ml-uploder', path: '/pages/packageUI/uploader/index' }
  ])

  const onNavigate = (item: ComponentItemType) => {
    uni.navigateTo({
      url: item.path
    })
  }
</script>

<style lang="less">
  @import './index.less';
</style>
