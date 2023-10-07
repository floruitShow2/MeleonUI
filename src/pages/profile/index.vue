<template>
  <view :class="prefix">
    <view :class="`${prefix}-wrapper`" :style="wrapperStyle">
      <MlAvatarGroup>
        <MlAvatar>Meleon</MlAvatar>
        <MlAvatar>Aliee</MlAvatar>
        <MlAvatar>Udemy</MlAvatar>
      </MlAvatarGroup>
    </view>
    <MlTabbar />
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlTabbar from '@/ml-ui/lib/ml-tabbar/index.vue'
  import MlAvatar from '@/ml-ui/lib/ml-avatar/index.vue'
  import MlAvatarGroup from '@/ml-ui/lib/ml-avatar-group/index.vue'
  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, screenHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${screenHeight - tabbarHeight - bottomBarHeight}px`
    }
  })
  const prefix = 'profile-view'
</script>

<style lang="less">
  @import './index.less';
</style>
