<template>
  <view :class="className" :style="baseStyle">
    <view
      v-for="option in options"
      :key="option.label"
      :class="{
        'ml-tabbar-item': true,
        'is-select': option.key === activeTab,
        'is-main': option.type === 'main'
      }"
      @click="onTabClick(option)"
    >
      <MlColorIcon
        :name="activeTab === option.key ? option.selectIcon : option.icon"
        :size="22"
        :color="option.type === 'main' ? '#FFFFFF' : '#808080'"
      />
      <text class="ml-tabbar-item-label">{{ option.label }}</text>
    </view>
  </view>
</template>

<!-- 底部导航栏，暂不暴露出去 -->
<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { onShow } from '@dcloudio/uni-app'
  import { useAppStore } from '@/store'
  import { cs } from '@/utils/property'
  import type { TabbarOptionType } from './type'
  import MlColorIcon from '../ml-colorIcon/index.vue'

  // const props = defineProps<{
  //   options: TabbarOptionType[]
  // }>()

  const appStore = useAppStore()

  /**
   * @description 样式生成
   * 根据用户使用的机型调整组件尺寸
   */
  const baseStyle = computed(() => {
    const { tabbarHeight, bottomBarHeight, screenWidth } = appStore.appSize
    return {
      height: `${tabbarHeight + bottomBarHeight}px`,
      width: `${screenWidth}px`,
      paddingBottom: `${bottomBarHeight}px`
    }
  })

  // 类名生成
  const prefix = ref('ml-tabbar')
  const className = cs(prefix.value)

  // tabbar options
  const options: TabbarOptionType[] = [
    {
      icon: 'ml-tab-home',
      selectIcon: 'ml-tab-home-select',
      label: '首页',
      key: 'home',
      path: '/pages/home/index'
    },
    // {
    //   icon: 'ml-tab-article',
    //   selectIcon: 'ml-tab-article-select',
    //   label: '专题',
    //   key: 'articles',
    //   path: '/pages/articles/index'
    // },
    // {
    //   icon: 'ml-plus',
    //   selectIcon: '',
    //   label: '',
    //   key: 'center',
    //   path: '',
    //   type: 'main'
    // },
    // {
    //   icon: 'ml-tab-idea',
    //   selectIcon: 'ml-tab-idea-select',
    //   label: '发现',
    //   key: 'discovery',
    //   path: '/pages/discovery/index'
    // },
    {
      icon: 'ml-tab-my',
      selectIcon: 'ml-tab-my-select',
      label: '我的',
      key: 'profile',
      path: '/pages/profile/index'
    }
  ]
  const activeTab = ref<string>('home')

  onShow(() => {
    const pages = getCurrentPages()
    const splitTab = pages[0].route?.split('/')[1]
    activeTab.value = splitTab || ''
  })

  const onTabClick = (option: TabbarOptionType) => {
    const { path, key } = option
    if (!path) return
    activeTab.value = key
    uni.switchTab({
      url: path
    })
  }
</script>

<style lang="less">
  @import './index.less';
</style>
