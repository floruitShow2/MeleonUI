<template>
  <view :class="className" @click="handleIconClick">
    <icon
      :class="cs('ml-icon-inner', name)"
      :style="{
        color,
        fontSize: `${size}px`,
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: `${size}px`
      }"
    />
  </view>
</template>

<script setup lang="ts">
  import { toRefs, computed } from 'vue'
  import { cs } from '../../utils/property'

  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 16
    },
    color: {
      type: String,
      default: '#808080'
    }
  })
  const emit = defineEmits(['click'])
  const { name, size } = toRefs(props)

  const prefix = 'ml-icon'
  const className = computed(() => {
    return cs(prefix, `${prefix}-${name.value.replace('ml-', '')}`)
  })

  const handleIconClick = (e: MouseEvent) => {
    e.preventDefault()
    emit('click', e)
  }
</script>

<style lang="less" scoped>
  @import './index.less';
  @import './icon.less';
</style>
