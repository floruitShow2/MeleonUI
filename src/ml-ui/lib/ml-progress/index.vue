<template>
  <view :class="className" :style="themeColors">
    <!-- ml-progress-line -->
    <template v-if="type === 'line'">
      <view :class="`${prefixLine}`" :style="themeColors">
        <view :class="`${prefixLine}-wrapper`" :style="style">
          <view :class="`${prefixLine}-wrapper-bar-buffer`" />
          <view :class="[`${prefixLine}-wrapper-bar`]" :style="barStyle" />
        </view>
        <view v-if="showText" :class="`${prefixLine}-text`">
          <slot name="text" :percent="percent" :decimal="decimal">
            {{ text }}
          </slot>
        </view>
      </view>
    </template>
    <!-- ml-progress-circle -->
    <template v-else>
      <view :class="prefixCircle">
        <view
          :class="`${prefixCircle}-wrapper`"
          :style="{ width: `${computedWidth}px`, height: `${computedWidth}px` }"
        >
          <canvas
            :class="`${prefixCircle}-wrapper-bar-buffer`"
            :canvas-id="canvasBufferId"
            :id="canvasBufferId"
            :style="{
              width: `${computedWidth}px`,
              height: `${computedWidth}px`
            }"
          ></canvas>
          <canvas
            :class="`${prefixCircle}-wrapper-bar`"
            :canvas-id="canvasId"
            :id="canvasId"
            :style="{
              width: `${computedWidth}px`,
              height: `${computedWidth}px`
            }"
          ></canvas>
          <view v-if="showText" :class="`${[prefixCircle]}-wrapper-text`">
            <slot name="text" :percent="percent" :decimal="decimal">
              {{ text }}
            </slot>
          </view>
        </view>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, watch, onMounted, getCurrentInstance } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs, isObject } from '@meleon/uni-ui/utils'
  import { MlStatusEnum } from '@meleon/uni-ui/constants'
  import type { ProgressProps } from './index.interface'

  const DEFAULT_WIDTH: Record<MlDesign.Size, number> = {
    mini: 16,
    small: 48,
    medium: 64,
    large: 80
  }

  const DEFAULT_STROKE_WIDTH: Record<MlDesign.Size, number> = {
    mini: 4,
    small: 3,
    medium: 4,
    large: 6
  }

  const props = defineProps({
    type: {
      type: String as PropType<ProgressProps['type']>,
      default: 'line'
    },
    percent: {
      type: Number,
      required: true
    },
    decimal: {
      type: Number,
      default: 0
    },
    showText: {
      type: Boolean,
      default: true
    },
    size: {
      type: String as PropType<ProgressProps['size']>,
      default: 'small'
    },
    width: {
      type: Number
    },
    strokeWidth: {
      type: Number,
      default: 0
    },
    status: {
      type: String as PropType<ProgressProps['status']>,
      default: 'primary'
    },
    color: {
      type: [String, Object],
      default: ''
    },
    trackColor: {
      type: String,
      default: '#f2f3f5'
    }
  })
  const { type, percent, decimal, size, width, strokeWidth, color, trackColor, status } =
    toRefs(props)

  const { themeColors } = useTheme()

  const instance = getCurrentInstance()

  // 类名
  const prefix = ref('ml-progress')
  const prefixLine = ref('ml-progress-line')
  const prefixCircle = ref('ml-progress-circle')

  // 进度条容器的宽度
  const computedWidth = computed(() => {
    return width?.value ?? DEFAULT_WIDTH[size.value]
  })

  // 进度条线段粗细
  const computedStrokeWidth = computed(
    () =>
      strokeWidth.value ||
      (size.value === 'mini' ? computedWidth.value / 2 : DEFAULT_STROKE_WIDTH[size.value])
  )

  // 当前进度条状态
  const computedStatus = computed(() => {
    return status.value ?? (percent.value >= 1 ? 'success' : 'primary')
  })
  const formatedColor = computed(() => {
    const genColor = (color: string) => {
      const regex = /\((.+?)\)/
      const matchedColor = color.match(regex)
      return matchedColor?.length ? themeColors.value[matchedColor[1]] : color
    }

    return color.value && !isObject(color.value)
      ? color.value
      : genColor(MlStatusEnum[computedStatus.value])
  })

  const className = computed(() => {
    return cs(prefix.value)
  })

  onMounted(() => {
    if (percent.value < 0 || percent.value > 1) {
      console.warn(`the value of percent must be between 0 and 1`)
    }
  })

  /**
   * ml-progress-line
   */
  const text = computed(() => `${(percent.value * 100).toFixed(decimal.value)}%`)

  const style = computed(() => {
    const style = width?.value ? { width: `${width.value}px`, flex: 'unset' } : { flex: 1 }

    return {
      ...style,
      '--bar-color': formatedColor.value,
      height: `${computedStrokeWidth.value}px`,
      backgroundColor: trackColor.value
    }
  })

  const getBackground = (color?: string | Record<string, string>) => {
    if (!color) {
      return undefined
    }

    if (isObject(color)) {
      const val = Object.keys(color)
        .map((key) => `${color[key]} ${key}`)
        .join(',')
      return {
        backgroundImage: `linear-gradient(to right, ${val})`
      }
    }
    return {
      backgroundColor: color
    }
  }

  const barStyle = computed(() => ({
    width: `${props.percent * 100}%`,
    ...getBackground(props.color)
  }))

  /**
   * ml-progress-circle
   */
  let ML_PROGRESS_SEED = (Math.random() * Math.pow(10, 8)).toFixed(0)

  const canvasId = computed(() => {
    return `${prefixCircle}-canvas-${ML_PROGRESS_SEED}`
  })
  const canvasBufferId = computed(() => {
    return `${prefixCircle}-canvas-buffer-${ML_PROGRESS_SEED}`
  })

  // 记录上次绘制时的进度值，下次绘制起始点从该进度开始
  const oldPercent = ref(0)
  const setOldPercent = (val: number) => {
    oldPercent.value = val
  }

  const drawProgressBuffer = () => {
    const ctx = uni.createCanvasContext(canvasBufferId.value, instance)
    ctx.setLineWidth(computedStrokeWidth.value)
    ctx.setStrokeStyle(trackColor.value)

    ctx.beginPath()

    const radius = computedWidth.value / 2
    ctx.arc(radius, radius, radius - computedStrokeWidth.value, 0, 2 * Math.PI, false)
    ctx.stroke()
    ctx.draw()
  }
  // 可能会需要多次绘制 progress bar，canvas context 没有必要重复创建
  const canvasBarCtx = ref<UniApp.CanvasContext>()
  const startAngle = ref(-Math.PI / 2)
  const drawProgressBar = (progress: number) => {
    if (!canvasBarCtx.value) {
      canvasBarCtx.value = uni.createCanvasContext(canvasId.value, instance)
    }

    const ctx = canvasBarCtx.value
    ctx.setLineCap('square')
    ctx.setLineWidth(computedStrokeWidth.value)
    ctx.setStrokeStyle(formatedColor.value)

    if (percent.value === 0) {
      console.log('aaa')
      ctx.draw()
      setOldPercent(0)
      return
    }

    ctx.beginPath()
    // 半径为整个canvas宽度的一半
    const radius = computedWidth.value / 2
    const endAngle = ((2 * Math.PI) / 100) * (progress * 100) + startAngle.value
    ctx.arc(radius, radius, radius - computedStrokeWidth.value, startAngle.value, endAngle, false)
    ctx.stroke()
    ctx.draw()

    // if the animation is true
    if (percent.value > oldPercent.value) {
      // 每次递增百分之一
      progress += 0.01
      // 如果新增后的值，大于需要设置的值百分比值，停止继续增加
      if (progress > percent.value) {
        setOldPercent(percent.value)
        return
      }
    } else {
      // 同理于上面
      progress -= 0.01
      if (progress < percent.value) {
        setOldPercent(percent.value)
        return
      }
    }
    setTimeout(() => {
      drawProgressBar(progress)
    }, 15)
  }
  onMounted(() => {
    if (type.value === 'circle') {
      drawProgressBuffer()
      drawProgressBar(oldPercent.value)
    }
  })

  watch(percent, () => {
    drawProgressBar(oldPercent.value)
  })
  watch(size, () => {
    setOldPercent(0)
    drawProgressBar(oldPercent.value)
  })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
