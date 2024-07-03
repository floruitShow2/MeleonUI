<template>
  <view class="effect-card" @click="emit('click')">
    <view class="effect-card-title">
      <text>{{ title }}</text>
      <text>{{ author }}</text>
    </view>
    <view class="effect-card-views">
      <view class="item">
        <ml-icon name="ml-eye" :size="16" />
        <text>{{ views }}</text>
      </view>
      <view class="item">
        <ml-icon name="ml-like" :size="16" />
        <text>{{ likes }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, toRefs } from 'vue'

  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    }
  })

  const { title, author, views, likes } = toRefs(props)

  const emit = defineEmits(['click'])
</script>

<style lang="less">
  @import './index.less';
</style>
