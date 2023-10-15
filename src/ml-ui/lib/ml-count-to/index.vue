<template>
  <view :class="className" :style="themeColors">
    <slot name="prefix"></slot>
    <text :class="`${prefix}-text`" :style="valueStyle">{{
      showSeperator ? formatNum(innerValue) : innerValue
    }}</text>
    <view v-if="$slots.suffix" :class="`${prefix}-suffix`" :style="valueStyle">
      <slot name="suffix"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, unref, toRefs, computed, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'
  import Tween from '../../utils/tween'

  const props = defineProps({
    from: {
      type: Number,
      default: 0
    },
    to: {
      type: Number,
      required: true
    },
    // 是否开启动画
    animation: {
      type: Boolean,
      default: false
    },
    // 动画持续
    animationDuration: {
      type: Number,
      default: 1000
    },
    // 是否显示千分位分隔符
    showSeperator: {
      type: Boolean,
      default: false
    },
    valueStyle: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    }
  })
  const { from, to, animation, showSeperator, animationDuration } = toRefs(props)

  const emit = defineEmits([])

  const { themeColors } = useTheme()
  const prefix = 'ml-count-to'
  const className = computed(() => {
    return cs(prefix)
  })

  const innerValue = ref<number>(0)

  const tween = ref<Tween>()

  const startAnimation = (fromValue = from.value, toValue = to.value) => {
    tween.value = new Tween({
      from: {
        value: fromValue
      },
      to: {
        value: toValue
      },
      duration: animationDuration.value,
      onUpdate: (keys) => {
        innerValue.value = keys.value
      }
    })
    tween.value.start()
  }

  const formatNum = (num: number): string => {
    const stringNum = num.toString()
    let intNum: string = ''
    let floatNum: string = ''

    if (stringNum.indexOf('.') !== -1) {
      ;[intNum, floatNum] = stringNum.split('.')
    } else {
      intNum = stringNum
    }

    const intNumArr = intNum.split('')
    let splitCharIdx = intNumArr.length - 3
    while (splitCharIdx > 0) {
      intNumArr.splice(splitCharIdx, 0, ',')
      splitCharIdx -= 3
    }
    return `${intNumArr.join('')}.${floatNum}`
  }

  onMounted(() => {
    if (animation.value) {
      startAnimation()
    } else {
      innerValue.value = to.value
    }
  })

  const pause = () => {
    if (tween.value) {
      tween.value.stop()
    }
  }

  const restart = () => {
    startAnimation(unref(innerValue.value), to.value)
  }

  defineExpose({
    start: startAnimation,
    pause,
    restart
  })
</script>

<style lang="less">
  @import './index.less';
</style>
