<template>
  <view :class="className" :style="themeColors"> </view>
</template>

<script setup lang="ts">
  import { toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'

  const props = defineProps({})
  const emit = defineEmits([])
  const {} = toRefs(props)
  const { themeColors } = useTheme()
  const prefix = 'ml-name'
  const className = computed(() => {
    return cs(prefix)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
