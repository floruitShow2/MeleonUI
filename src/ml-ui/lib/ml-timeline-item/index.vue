<template>
  <view :class="className" :style="{ ...themeColors, ...componentStyle }">
    <view :class="`${prefix}-dot-wrapper`">
      <view :class="`${prefix}-dot-content`">
        <view
          v-if="!$slots.dot"
          :class="`${prefix}-dot`"
          :style="{
            backgroundColor: dotColor
          }"
        ></view>
        <slot name="dot" />
      </view>
      <view :class="dotLineCls" :style="genLineStyle" />
    </view>
    <view :class="`${prefix}-content-wrapper`">
      <view :class="`${prefix}-label`">
        <slot name="label" />
      </view>
      <view :class="`${prefix}-content`">
        <slot />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import {
    ref,
    toRefs,
    computed,
    onMounted,
    getCurrentInstance,
    inject,
    watch
  } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs, getRect } from '@meleon/uni-ui/utils'
  import type { TimelineItemProps } from './index.interface'
  import { timelineInjectionKey } from '../ml-timeline/context'

  const props = defineProps({
    dotColor: {
      type: String,
      default: ''
    },
    lineType: {
      type: String as PropType<TimelineItemProps['lineType']>,
      default: 'solid'
    },
    lineStyle: {
      type: Object as PropType<TimelineItemProps['lineStyle']>,
      default: () => ({})
    }
  })
  const { lineStyle, lineType } = toRefs(props)

  const emit = defineEmits([])
  const { themeColors } = useTheme()

  const instance = getCurrentInstance()
  const globalCtx = inject(timelineInjectionKey, null)

  // 更新索引
  const idx = ref(-1)
  onMounted(() => {
    if (globalCtx) idx.value = globalCtx.getTimelineItemIndex()
  })

  // 计算组件类名
  const prefix = ref('ml-timeline-item')
  const className = computed(() => {
    return cs(
      prefix.value,
      [
        `${prefix.value}-${globalCtx?.direction.value}-${globalCtx?.mode.value}`
      ],
      {
        [`${prefix.value}-${globalCtx?.direction.value}-${globalCtx?.mode
          .value}-${idx.value % 2 === 0 ? 'left' : 'right'}`]:
          globalCtx?.mode.value === 'alternate'
      }
    )
  })
  // 计算组件尺寸
  const componentStyle = ref({})
  const updateComponentRect = async () => {
    if (!globalCtx) return
    const res = await globalCtx.getTimeLineRect()
    if (!res) return
    componentStyle.value = {
      width: `${res.width}px`
    }
  }

  // 计算内容尺寸
  const contentWrapperRect = ref<Record<string, number>>({})
  const updateContentRect = async () => {
    const res = await getRect(instance, `.${prefix.value}-content-wrapper`)
    if (!res) return
    const { width, height, top, bottom, left, right } = res
    contentWrapperRect.value = {
      width,
      height,
      top,
      bottom,
      left,
      right
    }
  }

  // 计算 dotLine 类名
  const dotLineCls = computed(() => {
    return cs(
      `${prefix.value}-dot-line`,
      `${prefix.value}-dot-line-${lineType.value}`
    )
  })
  // 计算 dotLine 高度
  const genDotLineHeight = () => {
    let height: number = contentWrapperRect.value?.height - 20 || 0
    if (!globalCtx) return 0
    // 不反转时间线，最后一个 item 的 dotLine 高度为0
    if (!globalCtx.reverse.value && globalCtx.total.value === idx.value) {
      height = 0
    }
    // 反转时间线，最后一个 item 的 dotLine 高度为0
    if (globalCtx.reverse.value && idx.value === 1) {
      height = 0
    }
    return height
  }
  const genLineStyle = computed(() => {
    return {
      height: `${genDotLineHeight()}px`,
      ...lineStyle.value
    }
  })
  const updateRect = () => {
    setTimeout(() => {
      updateComponentRect()
      updateContentRect()
    }, 0)
  }

  watch(() => globalCtx?.mode, updateRect, { deep: true, immediate: true })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
