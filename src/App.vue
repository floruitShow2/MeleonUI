<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
  import { useAppStore } from '@/store'
  import { getStorage } from '@/utils/storage'
  import { AppStorageKeys } from '@/common'
  import type { AppState } from './store/modules/app/type'
  onLaunch(async () => {
    const appStore = useAppStore()
    // 更新设备尺寸
    appStore.updateDeviceUI()
    // 更新语言包
    const locale = await getStorage(AppStorageKeys['locale'])
    appStore.toggleLocale((locale as AppState['locale'] | null) || 'zh-CN')
  })
  onShow(async () => {
    console.log('App Show')
    // uni.hideTabBar()
  })
  onHide(() => {
    console.log('App Hide')
  })
</script>

<style></style>
