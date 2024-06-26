<template>
  <view :class="className" @click="handleIconClick">
    <icon
      :class="innerClassName"
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
  import { ref, toRefs, computed } from 'vue'
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

  const prefix = ref('ml-icon')
  const className = computed(() => {
    return cs(
      prefix.value,
      `${prefix.value}-${name.value.replace('ml-', '')}`
    )
  })
  const innerClassName = computed(() => {
    return cs(
      'ml-icon-inner',
      name.value,
      {
        [`${prefix.value}-rotating`]: ['ml-loading', 'ml-loading--line'].includes(name.value)
      })
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
