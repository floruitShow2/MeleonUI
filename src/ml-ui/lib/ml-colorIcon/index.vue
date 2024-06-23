<template>
  <view :class="className" @click="emit('click')">
    <icon
      :class="['ml-color-icon', name]"
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
  import { ref, toRefs, computed } from 'vue'
  import { cs } from '@meleon/uni-ui/utils'

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
    return cs(prefix.value, `${prefix.value}-${name.value.replace('ml-', '')}`)
  })
</script>

<style lang="less" scoped>
  @import './index.less';
  @import './colorIcon.less';
</style>
