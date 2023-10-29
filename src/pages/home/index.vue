<template>
  <view class="home-view">
    <MlNavigator
      :title="$t('home.navigation.title')"
      title-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view
      class="home-view-content"
      :style="{
        width: `${ui.screenWidth}px`,
        height: `${ui.contentHeight}px`
      }"
    >
      <!-- 项目列表 -->
      <view class="projects">
        <view class="projects-item" @click="onNavigate('/pages/componentList/index')">
          <view class="projects-item-image">
            <image class="image" src="../../assets/home/MeleonUI.png" mode="aspectFit" />
          </view>
          <text class="projects-item-label">{{ $t('home.tools.component') }}</text>
        </view>
        <view class="projects-item" @click="onNavigate('/pages/chart/index')">
          <view class="projects-item-image">
            <MlColorIcon icon="ml-effect" :size="26" />
          </view>
          <text class="projects-item-label">{{ $t('home.tools.chart') }}</text>
        </view>
      </view>
    </view>
    <MlTabbar />
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlColorIcon from '@/ml-ui/lib/ml-colorIcon/index.vue'
  import MlTabbar from '@/ml-ui/lib/ml-tabbar/index.vue'

  const appStore = useAppStore()

  const ui = computed(() => {
    return appStore.appSize
  })

  const onNavigate = (url: string) => {
    uni.navigateTo({ url })
  }

  onMounted(async () => {
    uni.request({
      url: 'http://localhost:3000/api/user/login',
      method: 'POST',
      data: {
        username: 'meleon',
        password: '232000'
      },
      complete: (res) => {
        console.log(res)
      }
    })
  })
</script>

<style lang="less">
  @import './index.less';
</style>
