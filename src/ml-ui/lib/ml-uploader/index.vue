<template>
  <view :class="className" :style="themeColors">
    <view :class="`${prefix}-files`">
      <div
        v-for="item in cachedImageList"
        :key="item.path"
        :class="`${prefix}-files-item`"
      >
        <Image
          :class="`${prefix}-files-item--image`"
          :src="item.path"
        />
        <div
          :class="`${prefix}-files-item--close`"
          @click.stop="() => handleDeleteFile(item)"
        >
          <Icon
            v-if="item.deletable"
            class="ml-icon-close"
            name="ml-close"
            color="#ffffff"
            :size="14"
          />
        </div>
      </div>
      <div v-if="!$slots.trigger" :class="`${prefix}-files-trigger`" @click="handleUpload">
        <Icon name="ml-camera--fill" :size="24" color="var(--info-color-8)" />
        <text :class="`${prefix}-files-trigger-text`">请上传图片文件</text>
      </div>
      <div @click="handleUpload">
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
  import Icon from '@meleon/uni-ui/lib/ml-icon/index.vue'
  import Image from '@meleon/uni-ui/lib/ml-image/index.vue'
  import { chooseImage, uploadFile } from './file-choose'
  import type { UploaderProps, FileItem } from './index.interface'

  const props = defineProps({
    action: {
      type: String as PropType<UploaderProps['action']>,
      default: ''
    },
    headers: {
      type: Object as PropType<UploaderProps['headers']>,
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
    disabled: {
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
    beforeDelete: {
      type: Function as PropType<UploaderProps['beforeDelete']>,
      default: () => true
    }
  })
  const {
    action,
    headers,
    fileList,
    multiple,
    disabled,
    sourceType,
    beforeUpload,
    beforeDelete
  } = toRefs(props)

  const emit = defineEmits(['update:fileList', 'delete'])

  const { themeColors } = useTheme()

  const prefix = ref('ml-uploader')
  const className = computed(() => {
    return cs(
      prefix.value,
      {
        [`${prefix.value}--disabled`]: disabled.value
      }
    )
  })

  const cachedImageList = ref<FileItem[]>([])

  watch(fileList, (newVal) => {
    cachedImageList.value = newVal
  })

  const handleUpload = async () => {
    const res = await chooseImage({
      multiple: multiple.value,
      sourceType: sourceType.value
    })
    let formatRes: FileItem[] = []
    if (isArray(res.tempFilePaths)) {
      formatRes = res.tempFilePaths.map((item, index) => ({
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

    if (action.value) {
      const requestList = cachedImageList.value.map(file => uploadFile({
        url: isString(action.value) ? action.value : action.value(),
        header: headers.value,
        path: file.path
      }))
      const res = await Promise.all(requestList)
      console.log('上传成功', res)
    }
    emit('update:fileList', cachedImageList.value)
  }

  const handleDeleteFile = async (file: FileItem) => {
    if (!(await beforeDelete.value(file))) return

    cachedImageList.value = cachedImageList.value.filter((item) => item.id !== file.id)

    emit('update:fileList', cachedImageList.value)
    emit('delete', file.id)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
