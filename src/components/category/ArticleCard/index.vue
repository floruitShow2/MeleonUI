<template>
  <view :class="className" @click="emit('click', id)">
    <view :class="`${prefix}-message`">
      <view :class="`${prefix}-message-title`">{{ title }}</view>
      <view :class="`${prefix}-message-details`">
        <text class="author">{{ author }}</text>
        <text>{{ formatTimeAgo(publishTime) }}</text>
      </view>
      <view :class="`${prefix}-message-description`">{{ description }}</view>
    </view>
    <image :class="`${prefix}-cover`" mode="aspectFill" alt="" />
  </view>
</template>

<script setup lang="ts">
  import { toRefs, computed } from 'vue'
  import { cs } from '@/utils/property'
  import { formatTimeAgo } from '@/utils/time'

  const props = defineProps({
    id: [String, Number],
    title: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    publishTime: {
      type: [String, Number, Date],
      default: new Date()
    },
    description: String
  })
  const { id, title, author, publishTime, description } = toRefs(props)

  const emit = defineEmits(['click'])
  const prefix = 'article-card'
  const className = computed(() => {
    return cs(prefix)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
