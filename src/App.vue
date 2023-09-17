<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
  import { useAppStore } from '@/store'
  onLaunch(() => {
    const appStore = useAppStore()
    appStore.updateDeviceUI()
    // uni.hideTabBar()
  })
  onShow(() => {
    console.log('App Show')
    // uni.hideTabBar()
  })
  onHide(() => {
    console.log('App Hide')
  })
</script>

<style></style>
