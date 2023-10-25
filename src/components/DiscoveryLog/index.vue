<template>
  <view :class="className">
    <view :class="`${prefix}-header`">
      <slot name="avatar"></slot>
      <view class="header-details">
        <text class="publisher">{{ publisher }}</text>
        <text class="publish-time">{{ formatToDateTime(publishTime, 'MM-DD HH:mm') }}</text>
      </view>
    </view>
    <view :class="`${prefix}-content`">
      <p class="description">{{ content }}</p>
    </view>
    <view :class="`${prefix}-images`">
      <view v-for="idx in images" :key="idx" class="images-item"></view>
    </view>
    <view :class="`${prefix}-footer`">
      <view class="footer-tags"></view>
      <!-- <view class=""></view> -->
    </view>
  </view>
</template>

<script setup lang="ts">
  import { toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import { cs } from '@/utils/property'
  import { formatToDateTime } from '@/utils/time'

  const props = defineProps({
    publisher: {
      type: String,
      default: ''
    },
    publishTime: {
      type: [String, Number, Date],
      default: () => new Date()
    },
    content: {
      type: String,
      default: ''
    },
    images: {
      type: Number,
      default: 4
    }
  })
  const {} = toRefs(props)

  const emit = defineEmits([])
  const prefix = 'discovery-log'
  const className = computed(() => {
    return cs(prefix)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
