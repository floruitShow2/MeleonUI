<template>
  <view class="content">
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <MlTabbar />
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import MlTabbar from '@/ml-ui/lib/ml-tabbar/index.vue'
  const title = ref('Hello Meleon')

  uni.getSystemInfo({
    success: function (res) {
      console.log(res)
    }
  })
</script>

<style lang="less">
  @import './index.less';
</style>
