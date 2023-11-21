<template>
  <web-view :src="url"></web-view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

  const url = ref('')

  onLoad((data) => {
    if (!data) return
    const decodeUrl = decodeURIComponent(data.url)
    url.value = decodeUrl
  })
</script>

<style lang="less">
  @import './index.less';
</style>
