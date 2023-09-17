<template>
  <view :class="className" :style="themeColors">{{ title }}</view>
</template>

<script setup lang="ts">
  import { toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'

  const props = defineProps({
    title: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits([])
  const {} = toRefs(props)
  const { themeColors } = useTheme()
  const prefix = 'ml-tab'
  const className = computed(() => {
    return cs(prefix)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
