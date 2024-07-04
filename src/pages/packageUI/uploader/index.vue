<template>
  <view class="uni_class">
    <ml-navigator
      title="ml-uploader"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background="#7A98B3"
    />
    <view class="view-wrapper" :style="wrapperStyle">
      <ml-uploader
        ref="uploadRef"
        v-model:file-list="fileList"
        action="http://localhost:3000/api/file/upload"
        :auto-upload="false"
        multiple
        show-file-list
        :disabled="false"
        :preview-size="100"
        :on-change="handleOnChange"
        @delete="handleDelete"
      ></ml-uploader>

      <!-- <ml-button type="primary" status="success" @click="handleSubmit">上传</ml-button> -->
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import type { FileItem, UploaderInstance } from '@meleon/uni-ui'

  /**
   * @deprecated
   */
  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const fileList = ref<FileItem[]>([])
  const handleDelete = () => {
    console.log('a', fileList.value)
  }

  const handleOnChange = (files: FileItem[]) => {
    console.log('a', files)
  }

  const uploadRef = ref<UploaderInstance>()
  const handleSubmit = () => {
    if (!uploadRef.value) return
    uploadRef.value.submit()
  }
</script>

<style lang="less">
  @import './index.less';
</style>
