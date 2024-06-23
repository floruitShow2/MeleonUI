<template>
  <view :class="className" :style="themeColors">
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  // @ts-ignore
  import { useTheme } from '@meleon/uni-ui/hooks'
  // @ts-ignore
  import { cs } from '@meleon/uni-ui/utils'

  const props = defineProps({})
  const {} = toRefs(props)

  const emit = defineEmits([])

  const { themeColors } = useTheme()

  const prefix = ref('ml-name')
  const className = computed(() => {
    return cs(prefix.value)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
