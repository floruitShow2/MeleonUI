<template>
  <view class="main">
    <ml-navigator
      title="ml-transition"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background="#7A98B3"
    />
    <view class="main-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description></template>
        <template #demo>
          <view class="button-container">
            <ml-button type="primary" @click="transition('fade')">Primary</ml-button>
          </view>
        </template>
      </CodeBlock>

      <ml-transition :appear="appear" :name="name" custom-class="block"></ml-transition>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import type { TransitionProps } from '@/ml-ui'
  import CodeBlock from '@/components/CodeBlock/index.vue'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const appear = ref(false)
  const name = ref<TransitionProps['name']>('fade')
  function transition(transition: TransitionProps['name']) {
    name.value = transition
    appear.value = true
    setTimeout(() => {
      appear.value = false
    }, 500)
  }

  const templateMap = ref([
    {
      templateCode: ``
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
