<template>
  <view class="ml-icon" @click="emit('click')">
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
  import { toRefs } from 'vue'

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
</script>

<style lang="less">
  @import './index.less';
  @import './icon.less';
  @import './colorIcon.less';
</style>
