<template>
  <view class="uni_class">
    <MlNavigator
      title="Uploader"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="view-wrapper" :style="wrapperStyle">
      <MlUploader
        v-model:file-list="fileList"
        multiple
        :disabled="false"
        @delete="handleUploaded"
      >
        <template #trigger>
          <ml-button type="primary">上传</ml-button>
        </template>
      </MlUploader>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlUploader from '@/ml-ui/lib/ml-uploader/index.vue'
  import type { FileItem } from '@/ml-ui/lib/ml-uploader'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const fileList = ref<FileItem[]>([])
  const handleUploaded = () => {
    console.log('a', fileList.value)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
