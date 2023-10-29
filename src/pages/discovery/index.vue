<template>
  <view class="discovery-view">
    <MlNavigator
      title="discovery"
      title-color="#FFFFFF"
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="discovery-view-wrapper" :style="wrapperStyle">
      <DiscoveryLog
        v-for="log in PersonalLogs"
        :key="log.publishTime"
        publisher="Meleon"
        :publish-time="log.publishTime"
        :content="log.content"
        :images="log.imageNums"
      >
        <template #avatar>
          <MlAvatar :size="36" shape="circle">
            <image src="@/assets/home/avatar.png" mode="widthFix" />
          </MlAvatar>
        </template>
      </DiscoveryLog>
      <!-- <MlButton type="primary" @click="handlePopupChange">开启Popup</MlButton> -->
      <MlDrawer v-model:visible="showPopup" placement="left" />
    </view>
    <MlTabbar />
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlTabbar from '@/ml-ui/lib/ml-tabbar/index.vue'
  import MlAvatar from '@/ml-ui/lib/ml-avatar/index.vue'
  import MlDrawer from '@/ml-ui/lib/ml-drawer/index.vue'
  import DiscoveryLog from '@/components/DiscoveryLog/index.vue'
  import { PersonalLogs } from './constants/logs'
  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight}px`
    }
  })

  const showPopup = ref<boolean>(false)
  const handlePopupChange = () => {
    showPopup.value = true
    console.log(showPopup.value)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
