<template>
  <!--components/CodeBlock/index.wxml-->
  <view class="code-block">
    <view class="code-block-title">
      <slot name="title" />
    </view>
    <view class="code-block-description">
      <slot name="description" />
    </view>
    <view class="code-block-demo">
      <slot name="demo" />
    </view>
    <view class="code-block-snippet">
      <view class="tools">
        <view
          :class="{
            'tools-item': true,
            'is-active': showCode
          }"
          @click="showCode = !showCode"
        >
          <MlIcon icon="ml-code-sandbox" :size="18" :color="showCode ? '#FFFFFF' : '#808080'" />
        </view>
        <view class="tools-item" @click="onCopy">
          <MlIcon icon="ml-copy" :size="18" />
        </view>
      </view>
      <view v-if="showCode" class="view">
        <text style="white-space: pre" @longpress="onCopy">{{ code }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs } from 'vue'
  import MlIcon from '@/ml-ui/lib/ml-icon/index.vue'

  const props = defineProps({
    code: {
      type: String,
      default: ''
    }
  })
  const { code } = toRefs(props)

  const showCode = ref(false)
  const onCopy = () => {
    if (showCode.value) uni.setClipboardData({ data: code.value })
  }
</script>

<style lang="less">
  @import './index.less';
</style>
