<template>
  <view :class="className" :style="themeColors">
    <slot />
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, provide, getCurrentInstance } from 'vue'
  import type { PropType } from 'vue'
  import useTheme from '../../hooks/useTheme/useTheme'
  import { cs } from '../../utils/property'
  import { getRect } from '../../utils/rect'
  import type { MlTimelineProps } from './type'

  import { timelineInjectionKey } from './context'

  const props = defineProps({
    reverse: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String as PropType<MlTimelineProps['direction']>,
      default: 'vertical'
    },
    mode: {
      type: String as PropType<MlTimelineProps['mode']>,
      default: 'left'
    }
  })
  const { reverse, direction, mode } = toRefs(props)

  const emit = defineEmits([])

  const instance = getCurrentInstance()

  const { themeColors } = useTheme()
  const prefix = 'ml-timeline'
  const className = computed(() => {
    return cs(prefix, [`${prefix}-${direction.value}`, `${prefix}-${mode.value}`], {
      [`${prefix}-reverse`]: reverse.value
    })
  })

  const total = ref(0)
  const getTimelineItemIndex = () => {
    return ++total.value
  }

  const getTimeLineRect = () => {
    return new Promise((resolve) => {
      getRect(instance, `.${prefix}`).then((res) => {
        resolve(res)
      })
    })
  }

  provide(timelineInjectionKey, {
    mode,
    total,
    reverse,
    direction,
    getTimeLineRect,
    getTimelineItemIndex
  })
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
