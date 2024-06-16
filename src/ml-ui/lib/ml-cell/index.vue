<template>
  <view :class="className" :style="{ ...themeColors }">
    {{ label }}
  </view>
</template>

<script setup lang="ts">
  import { computed, toRefs } from 'vue'
  import type { PropType } from 'vue'
  import { CellType, type CellBaseProps } from './type'
  import useTheme from '../../hooks/useTheme/useTheme'
  import { cs } from '../../utils/property'
  const props = defineProps({
    label: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<CellBaseProps['type']>,
      default: CellType.TEXT
    }
  })
  const { label, description, value } = toRefs(props)

  const { themeColors } = useTheme()
  const prefix = 'ml-cell'
  const className = computed(() => {
    return cs(prefix)
  })
</script>

<style scoped lang="less">
  @import './index.less';
</style>
