<template>
  <view :class="className" :style="themeColors">
    <slot name="title">
      <text :class="`${prefix}-title`">{{ title }}</text>
    </slot>
    <view :class="`${prefix}-content`">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, provide } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs } from '@meleon/uni-ui/utils'
  import { cellGroupInjectionKey } from './context'

  const props = defineProps({
    title: {
      type: String,
      default: '',
    }
  })
  const { title } = toRefs(props)

  const { themeColors } = useTheme()

  const prefix = 'ml-cell-group'
  const className = computed(() => {
    return cs(prefix)
  })

  const total = ref(0)
  const getCellGroupItemIndex = () => {
    return ++total.value
  }

  provide(cellGroupInjectionKey, {
    total,
    getCellGroupItemIndex
  })
</script>

<style lang="less">
  @import './index.less';
</style>
