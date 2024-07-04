<template>
  <view class="components-container">
    <ml-navigator
      title="MeleonUI"
      title-color="#FFFFFF"
      :has-back="false"
      icon-color="#FFFFFF"
      background="#7A98B3"
    />
    <view
      class="components-container-list"
      :style="{
        height: `${ui.contentHeight + ui.tabbarHeight + ui.bottomBarHeight}px`
      }"
    >
      <view v-for="item in componentList" :key="item.name" class="bar" @click="onNavigate(item)">
        <view class="bar-label">
          {{ item.name }}
          <ml-tag
            v-if="item.isNew"
            model-value="新"
            type="danger"
            size="mini"
          ></ml-tag>
        </view>
        <MlIcon name="ml-arrow-right" color="#808080" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlIcon from '@meleon/uni-ui/lib/ml-icon/index.vue'

  const appStore = useAppStore()
  const ui = computed(() => {
    return appStore.appSize
  })

  interface ComponentItemType {
    name: string
    path: string
    isNew?: boolean
  }
  const componentList = ref<ComponentItemType[]>([
    { name: '头像 ml-avatar', path: '/pages/packageUI/avatar/index' },
    { name: '按钮 ml-button', path: '/pages/packageUI/button/index' },
    { name: '单元格 ml-cell', path: '/pages/packageUI/cell/index' },
    { name: '复选框 ml-checkbox', path: '/pages/packageUI/checkbox/index' },
    { name: '计数 ml-count-to', path: '/pages/packageUI/countTo/index' },
    { name: '抽屉 ml-drawer', path: '/pages/packageUI/drawer/index' },
    { name: '图标 ml-icon', path: '/pages/packageUI/icon/index' },
    { name: '输入框 ml-input', path: '/pages/packageUI/input/index' },
    { name: '标签输入框 ml-input-tag', path: '/pages/packageUI/inputTag/index' },
    { name: '消息提示 ml-message', path: '/pages/packageUI/message/index' },
    { name: '头部导航 ml-navigator', path: '/pages/packageUI/navigator/index', isNew: true },
    { name: '进度条 ml-progress', path: '/pages/packageUI/progress/index' },
    // { name: '滑动单元格 ml-swiper-cell', path: '../../package-WsUI/pages/swiperCell/swiperCell' },
    { name: '下拉选框 ml-select', path: '/pages/packageUI/select/index' },
    { name: '开关 ml-switch', path: '/pages/packageUI/switch/index', isNew: true },
    { name: '导航栏 ml-tabs', path: '/pages/packageUI/tabs/index' },
    { name: '标签 ml-tag', path: '/pages/packageUI/tag/index' },
    { name: '表格 ml-table', path: '/pages/packageUI/table/index' },
    { name: '时间线 ml-timeline', path: '/pages/packageUI/timeline/index' },
    { name: '树 ml-tree', path: '/pages/packageUI/tree/index' },
    { name: '图片上传 ml-uploder', path: '/pages/packageUI/uploader/index' }
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
