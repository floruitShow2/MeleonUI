<template>
  <view :class="className" :style="themeColors">
    <view v-if="type === 'line'" :class="`${prefix}-line-wrapper`">
      <view :class="`${prefix}-line-outer`"> <ProgressLine /> </view>
      <view :class="`${prefix}-line-text`"></view>
    </view>
    <view v-else :class="`${prefix}-circle-wrapper`"></view>
  </view>
</template>

<script setup lang="ts">
  import { toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'
  import ProgressLine from './line.vue'
  import type { BaseMlProgressProps } from './type'

  const props = defineProps({
    type: {
      type: String as PropType<BaseMlProgressProps['type']>,
      default: 'line'
    },
    percent: {
      type: Number,
      required: true
    }
  })
  const { type } = toRefs(props)

  const emit = defineEmits([])
  const { themeColors } = useTheme()

  // 类名
  const prefix = 'ml-progress'
  const className = computed(() => {
    return cs(prefix)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
