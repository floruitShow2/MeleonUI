<template>
  <view :class="className" @click="emit('click')">
    <icon
      :class="['iconfont', icon]"
      :style="{
        color,
        fontSize: `${size}px`,
        width: `${size}px`,
        height: `${size}px`
      }"
    />
  </view>
</template>

<script setup lang="ts">
  import { toRefs, computed } from 'vue'
  import { cs } from '../../utils/property'

  const props = defineProps({
    icon: {
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
  const { icon, size } = toRefs(props)

  const prefix = 'ml-icon'
  const className = computed(() => {
    return cs(prefix, `${prefix}-${icon.value.replace('ml-', '')}`)
  })
</script>

<style lang="less">
  @import './index.less';
  @import './icon.less';
  @import './colorIcon.less';
</style>
