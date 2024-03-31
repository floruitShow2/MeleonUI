<template>
  <view :class="className" :style="themeColors">
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
    <view v-else :class="`${prefix}-circle-wrapper`"></view>
  </view>
</template>

<script setup lang="ts">
  import { toRefs, onMounted, computed } from 'vue'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'
  import { isObject } from '../../utils/is'
  import STATUS_MAP from '../../constants/status'
  import type { PropType } from 'vue'
  import type { BaseMlProgressProps } from './type'

  const props = defineProps({
    type: {
      type: String as PropType<BaseMlProgressProps['type']>,
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
    width: {
      type: Number
    },
    strokeWidth: {
      type: Number,
      default: 4
    },
    status: {
      type: String as PropType<BaseMlProgressProps['status']>,
      default: 'primary'
    },
    color: {
      type: String
    },
    trackColor: {
      type: String,
      default: 'var(--info-color-6)'
    }
  })
  const { type, percent, decimal, width, strokeWidth, color, status } = toRefs(props)

  const emit = defineEmits([])
  const { themeColors } = useTheme()

  // 类名
  const prefix = 'ml-progress'
  const prefixLine = 'ml-progress-line'

  // 当前进度条状态
  const computedStatus = computed(() => {
    console.log(status.value ?? (percent.value >= 1 ? 'success' : 'primary'))
    return status.value ?? (percent.value >= 1 ? 'success' : 'primary')
  })

  const className = computed(() => {
    return cs(prefix)
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
    const formatedColor = color?.value || STATUS_MAP[computedStatus.value]
    return {
      ...style,
      '--bar-color': formatedColor,
      height: `${strokeWidth.value}px`,
      backgroundColor: props.trackColor
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
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
