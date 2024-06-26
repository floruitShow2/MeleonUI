<template>
  <view :class="className" :style="{ ...themeColors, ...style }">
    <view :class="`${prefix}-files`">
      <template v-if="showFileList">
        <div v-for="item in cachedImageList" :key="item.path" :class="`${prefix}-files-item`">
          <Image
            :class="`${prefix}-files-item--image`"
            :src="item.path"
            :width="previewSize"
            :height="previewSize"
            show-loading
          />
          <div :class="`${prefix}-files-item--close`" @click.stop="() => handleDeleteFile(item)">
            <Icon
              v-if="item.deletable"
              class="ml-icon-close"
              name="ml-close"
              color="#ffffff"
              :size="14"
            />
          </div>
        </div>
      </template>
      <div v-if="!$slots.trigger" :class="`${prefix}-files-trigger`" @click="handleUploadFile">
        <Icon name="ml-camera--fill" :size="24" color="var(--info-color-8)" />
        <text :class="`${prefix}-files-trigger-text`">请上传图片文件</text>
      </div>
      <div @click="handleUploadFile">
        <slot name="trigger"> </slot>
      </div>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, watch } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs, isArray, isString } from '@meleon/uni-ui/utils'
  import { chooseImage, uploadFile } from './file-choose'
  import type { UploaderProps, FileItem } from './index.interface'
  import Icon from '../ml-icon/index.vue'
  import Image from '../ml-image/index.vue'

  const props = defineProps({
    action: {
      type: String as PropType<UploaderProps['action']>,
      default: ''
    },
    autoUpload: {
      type: Boolean,
      default: false
    },
    fieldName: {
      type: String,
      default: 'file'
    },
    headers: {
      type: Object as PropType<UploaderProps['headers']>,
      default: () => ({})
    },
    data: {
      type: Object as PropType<UploaderProps['data']>,
      default: () => ({})
    },
    fileList: {
      type: Array as PropType<UploaderProps['fileList']>,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 9
    },
    previewSize: {
      type: Number,
      default: 100
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    sourceType: {
      type: String as PropType<UploaderProps['sourceType']>,
      default: ''
    },
    beforeUpload: {
      type: Function as PropType<UploaderProps['beforeUpload']>,
      default: () => true
    },
    onChange: {
      type: Function as PropType<UploaderProps['onChange']>,
      default: () => {}
    },
    beforeDelete: {
      type: Function as PropType<UploaderProps['beforeDelete']>,
      default: () => true
    }
  })
  const {
    action,
    autoUpload,
    fieldName,
    headers,
    data,
    fileList,
    multiple,
    limit,
    previewSize,
    disabled,
    sourceType,
    beforeUpload,
    beforeDelete,
    onChange
  } = toRefs(props)

  const emit = defineEmits(['update:fileList', 'delete', 'uploaded'])

  const { themeColors } = useTheme()

  const prefix = ref('ml-uploader')
  const className = computed(() => {
    return cs(prefix.value, {
      [`${prefix.value}--disabled`]: disabled.value || cachedImageList.value.length >= limit.value
    })
  })
  const style = computed(() => {
    return {
      '--preview-size': `${previewSize.value}px`
    }
  })

  const cachedImageList = ref<FileItem[]>([])

  watch(fileList, (newVal) => {
    cachedImageList.value = newVal
  })

  // 上传文件到服务器
  const handleSubmitFile = async () => {
    const requestList = cachedImageList.value.map((file) =>
      uploadFile({
        url: isString(action.value) ? action.value : action.value(),
        path: file.path,
        fieldName: fieldName.value,
        header: headers.value,
        formData: data.value
      })
    )
    const res = await Promise.all(requestList)
    emit(
      'uploaded',
      res.filter((item) => item.statusCode < 300 && item.statusCode >= 200).map((item) => item.data)
    )
  }
  // 选择文件保存在本地缓存
  const handleUploadFile = async () => {
    const res = await chooseImage({
      multiple: multiple.value,
      limit: limit.value,
      sourceType: sourceType.value
    })
    let formatRes: FileItem[] = []
    if (isArray(res.tempFilePaths)) {
      formatRes = res.tempFilePaths.slice(0, limit.value).map((item, index) => ({
        id: `${Date.now()}${index}`,
        path: item,
        deletable: true
      }))
    } else {
      formatRes = [
        {
          path: res.tempFilePaths,
          id: `${Date.now()}${cachedImageList.value.length + 1}`,
          deletable: true
        }
      ]
    }

    if (!(await beforeUpload.value(formatRes))) return

    cachedImageList.value.push(...formatRes)

    // 如果传递了 onChange，则触发
    onChange.value && onChange.value(cachedImageList.value)

    // 自动上传
    if (action.value && autoUpload.value) {
      await handleSubmitFile()
    }

    emit('update:fileList', cachedImageList.value)
  }
  // 从本地缓存中删除文件
  const handleDeleteFile = async (file: FileItem) => {
    if (!(await beforeDelete.value(file))) return

    cachedImageList.value = cachedImageList.value.filter((item) => item.id !== file.id)

    emit('update:fileList', cachedImageList.value)
    emit('delete', file.id)
  }

  const handleUpdateFile = (id: string, file: FileItem) => {
    const findIdx = cachedImageList.value.findIndex((item) => item.id === id)
    if (findIdx === -1) return
    cachedImageList.value.splice(findIdx, 1, file)
  }

  defineExpose({
    submit: handleSubmitFile,
    updateFile: handleUpdateFile
  })
</script>

<style lang="less">
  @import './index.less';
</style>
