<template>
  <view :class="className" :style="themeColors"> </view>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'

  const { themeColors } = useTheme()
  const prefix = 'ml-name'
  const className = computed(() => {
    return cs(prefix)
  })
</script>

<style lang="less"></style>
