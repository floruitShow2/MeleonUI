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
        >
          <ml-icon
            name="ml-code-sandbox"
            :size="18"
            :color="showCode ? '#FFFFFF' : '#808080'"
            @click="onCodeClick"
          />
        </view>
        <view class="tools-item">
          <ml-icon name="ml-copy" :size="18" @click="onCopy" />
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

  const props = defineProps({
    code: {
      type: String,
      default: ''
    }
  })
  const { code } = toRefs(props)

  const showCode = ref(false)
  const onCodeClick = () => {
    showCode.value = !showCode.value
  }
  const onCopy = () => {
    if (showCode.value) uni.setClipboardData({ data: code.value })
  }
</script>

<style lang="less">
  @import './index.less';
</style>
