<template>
  <view :class="className" :style="{ ...themeColors, ...outerStyle }">
    <view :class="`${prefix}-text`" :style="textStyle">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
  import {
    ref,
    toRefs,
    computed,
    inject,
    onMounted,
    getCurrentInstance
  } from 'vue'
  import type { PropType } from 'vue'
  import useTheme from '@meleon/uni-ui/hooks/useTheme/useTheme'
  import { cs } from '@meleon/uni-ui/utils/property'
  import { getRect } from '@meleon/uni-ui/utils/rect'
  import type { AvatarProps } from './index.interface'
  import { avatarGroupInjectionKey } from '../ml-avatar-group/context'

  const props = defineProps({
    size: {
      type: Number,
      default: 32
    },
    shape: {
      type: String as PropType<AvatarProps['shape']>,
      default: 'square'
    }
  })
  const { size, shape } = toRefs(props)

  const { themeColors } = useTheme()
  const prefix = ref('ml-avatar')
  const groupCtx = inject(avatarGroupInjectionKey, null)

  const className = computed(() =>
    cs(prefix.value, [
      groupCtx
        ? `${prefix.value}-${groupCtx.globalShape}`
        : `${prefix.value}-${shape.value}`
    ])
  )

  /**
   * @description 在 ml-avatar-group 中的当前 ml-avatar 的索引
   */
  const index = ref(-1)

  const outerStyle = computed(() => {
    let style: Record<string, any> = {
      width: `${size.value}px`,
      height: `${size.value}px`
    }

    if (groupCtx) {
      style = {
        width: `${groupCtx.globalSize}px`,
        height: `${groupCtx.globalSize}px`,
        zIndex: groupCtx.total - index.value,
        display: groupCtx.maxCount < index.value ? 'none' : 'flex',
        marginLeft:
          index.value === 1
            ? 0
            : `-${groupCtx.offset === 0 ? size.value / 2 : groupCtx.offset}px`
      }
    }

    return style
  })

  const textStyle = ref<Record<string, any>>({})
  const instance = getCurrentInstance()
  /**
   * @description 自动调整字体大小
   */
  const autoFixFontSizeHanlder = async () => {
    const itemRect = await getRect(instance, `.${prefix.value}`)
    const wrapperRect = await getRect(instance, `.${prefix.value}-text`)
    if (!itemRect || !wrapperRect) return
    const textWidth = wrapperRect.width
    const avatarWidth = itemRect.width
    const scale = avatarWidth / (textWidth + 8)
    if (avatarWidth && scale < 1) {
      textStyle.value.transform = `scale(${scale})`
    }
  }

  onMounted(() => {
    autoFixFontSizeHanlder()
    if (groupCtx) index.value = groupCtx.getAvatarId()
  })
</script>

<style lang="less">
  @import './index.less';
</style>
