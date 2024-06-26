<template>
  <view :class="className" :style="{ ...themeColors, ...style.main }">
    <image
      :src="src"
      :mode="mode"
      @click="handleImageClick"
      @load="handleImageLoaded"
      @error="handleImageError"
    ></image>
    <!-- 加载中 -->
    <view v-if="showLoading && isLoading" :class="`${prefix}--loading`">
      <slot name="loading">
        <Icon name="ml-loading" />
      </slot>
    </view>
    <!-- 异常提示 -->
    <view v-if="showError && isErrorOccured" :class="`${prefix}--error`">
      <slot name="error">
        <text :class="`${prefix}--error-text`">加载失败</text>
      </slot>
    </view>
    <!-- 图片预览 -->
    <view v-if="showPreviewImage" :class="`${prefix}-preview`" :style="{ ...style.preview }">
      <view :class="`${prefix}-preview-wrapper`">
        <!-- 图片预览区域 -->
        <view :class="`${prefix}-preview-wrapper--image`">
          <image :src="src" :mode="mode" :style="style.image"></image>
        </view>
        <!-- 按钮工具区域 -->
        <view :class="`${prefix}-preview-wrapper--tools`">
          <view
            v-for="tool in filterPreviewTools"
            :key="tool.name"
            class="tool-item"
            @click="tool.handler()"
          >
            <Icon :name="tool.icon" :size="20" color="var(--info-color-8)"></Icon>
          </view>
        </view>
        <!-- 关闭按钮 -->
        <view :class="`${prefix}-preview-wrapper--close`" @click="handleClosePreview">
          <Icon name="ml-close" :size="24" color="#FFFFFF"></Icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs, generateDeviceUI, isNumber } from '@meleon/uni-ui/utils'
  import Icon from '../ml-icon/index.vue'
  import {
    ImageModeEnum,
    type ImageProps,
    type ImageToolType,
    type ImageToolEntity
  } from './index.interface'

  const props = defineProps({
    hasNav: {
      type: Boolean,
      default: true
    },
    src: {
      type: String,
      required: true
    },
    mode: {
      type: String as PropType<ImageProps['mode']>,
      default: ImageModeEnum.ASPECT_FIT
    },
    width: {
      type: [String, Number],
      default: 100
    },
    height: {
      type: [String, Number],
      default: 100
    },
    tools: {
      type: String,
      default: 'zoomIn,zoomOut,rotate,reset'
    },
    showPreview: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: false
    },
    showError: {
      type: Boolean,
      default: false
    }
  })
  const { src, width, height, tools, hasNav, showPreview } = toRefs(props)

  const emit = defineEmits(['loaded', 'error', 'click'])

  const { themeColors } = useTheme()

  const prefix = ref('ml-image')
  const className = computed(() => {
    return cs(prefix.value)
  })
  const style = computed(() => {
    const { statusBarHeight, customBarHeight } = generateDeviceUI().ui
    const navigatorHeight = hasNav.value ? `${statusBarHeight + customBarHeight}px` : 0
    return {
      // 主体样式
      main: {
        width: isNumber(width.value) ? `${width.value}px` : width.value,
        height: isNumber(height.value) ? `${height.value}px` : height.value
      },
      // 预览容器样式
      preview: {
        top: hasNav.value ? navigatorHeight : 0,
        height: hasNav.value ? `calc(100vh - ${navigatorHeight})` : '100vh'
      },
      // 图片样式
      image: {
        transform: `scale(${zoomLevel.value}) rotate(${rotateDegree.value}deg)`
      }
    }
  })

  const zoomLevel = ref<number>(1)
  const rotateDegree = ref<number>(0)
  const previewTools: Record<ImageToolType, ImageToolEntity> = {
    zoomIn: {
      name: '缩小',
      icon: 'ml-zoom-in',
      handler() {
        console.log('zoom in')
        zoomLevel.value = zoomLevel.value <= 0.5 ? zoomLevel.value : zoomLevel.value - 0.1
      }
    },
    zoomOut: {
      name: '放大',
      icon: 'ml-zoom-out',
      handler() {
        console.log('zoom out')
        zoomLevel.value = zoomLevel.value >= 1.5 ? zoomLevel.value : zoomLevel.value + 0.1
      }
    },
    rotate: {
      name: '旋转',
      icon: 'ml-rotate',
      handler() {
        console.log('rotate')
        rotateDegree.value = rotateDegree.value >= 360 ? 0 : rotateDegree.value + 90
      }
    },
    reset: {
      name: '重置',
      icon: 'ml-reset',
      handler() {
        console.log('reset')
        zoomLevel.value = 1
        rotateDegree.value = 0
      }
    }
  }
  const filterPreviewTools = computed<ImageToolEntity[]>(() => {
    const toolsArray: string[] = ['reset', 'zoomIn', 'zoomOut', 'rotate']
    const toolsList = tools.value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => toolsArray.indexOf(item) !== -1)
    return toolsList.map((item) => previewTools[item as ImageToolType])
  })

  const showPreviewImage = ref(false)
  const handleImageClick = () => {
    if (showPreview.value) showPreviewImage.value = true
    emit('click', src.value)
  }
  const handleClosePreview = () => {
    showPreviewImage.value = false
    console.log('关闭预览')
  }

  const isLoading = ref(true)
  const handleImageLoaded = () => {
    isLoading.value = false
    emit('loaded')
  }
  const isErrorOccured = ref(false)
  const handleImageError = () => {
    isErrorOccured.value = true
    emit('error')
  }
</script>

<style lang="less">
  @import './index.less';
</style>
