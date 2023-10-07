<template>
  <view :class="className" :style="{ ...themeColors, ...outerStyle }">
    <image v-if="imgUrl" :class="`${prefixCls}-iamge`" :src="imgUrl" alt="" />
    <view v-else :class="`${prefixCls}-text`" :style="textStyle">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, inject, onMounted, getCurrentInstance } from 'vue'
  import type { PropType } from 'vue'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'
  import { getRect } from '../../utils/rect'
  import type { BaseAvatarProps } from './type'
  import { avatarGroupInjectionKey } from './context'

  const props = defineProps({
    imgUrl: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 32
    },
    shape: {
      type: String as PropType<BaseAvatarProps['shape']>,
      default: 'square'
    }
  })
  const { size, shape, imgUrl } = toRefs(props)

  const emit = defineEmits([])
  const { themeColors } = useTheme()
  const prefixCls = 'ml-avatar'

  const groupCtx = inject(avatarGroupInjectionKey)
  const index = ref(1)

  const outerStyle = computed(() => {
    const style: Record<string, any> = {
      width: `${size.value}px`,
      height: `${size.value}px`
    }

    if (groupCtx) {
      style.zIndex = groupCtx.total - index.value
    }

    return style
  })

  const textStyle = ref<Record<string, any>>({})
  const instance = getCurrentInstance()
  console.log(instance)
  const autoFixFontSizeHanlder = async () => {
    if (imgUrl.value) return
    const itemRect = await getRect(instance, `.${prefixCls}`)
    const wrapperRect = await getRect(instance, `.${prefixCls}-text`)
    if (!itemRect || !wrapperRect) return
    const textWidth = wrapperRect.width
    const avatarWidth = itemRect.width
    const scale = avatarWidth / (textWidth + 8)
    if (avatarWidth && scale < 1) {
      textStyle.value.transform = `scale(${scale})`
    }
  }

  const className = computed(() => cs(prefixCls, `${prefixCls}-${shape.value}`))

  onMounted(() => {
    autoFixFontSizeHanlder()
  })
</script>

<style lang="less">
  @import './index.less';
</style>
