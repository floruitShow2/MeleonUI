<template>
  <view :class="className" :style="{ ...themeColors, ...style }">
    <image :src="src" :mode="mode" @click="handleImageClick"></image>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs, isNumber } from '@meleon/uni-ui/utils'
  import { ImageModeEnum, type ImageProps } from './index.interface'

  const props = defineProps({
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
    }
  })
  const { width, height } = toRefs(props)

  const emit = defineEmits([])

  const { themeColors } = useTheme()

  const prefix = ref('ml-image')
  const className = computed(() => {
    return cs(prefix.value)
  })

  const style = computed(() => {
    return {
      width: isNumber(width.value) ? `${width.value}px` : width.value,
      height: isNumber(height.value) ? `${height.value}px` : height.value
    }
  })

  const handleImageClick = () => {
    console.log('点击图片，开始预览')
  }
</script>

<style lang="less">
  @import './index.less';
</style>
