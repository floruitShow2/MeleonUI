<template>
  <view class="view">
    <ml-navigator
      title="ml-config-provider"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background="#7A98B3"
    />
    <view class="view-wrapper" :style="wrapperStyle">
      <code-block :code="templateCode[0].code" style="width: 100%">
        <template #title>
          <text>自定义主题色</text>
        </template>
        <template #description>
          <text> 设置 themes 属性，可以自定义主题色 </text>
        </template>
        <template #demo>
          <ml-config-provider :themes="themes">
            <view class="view-wrapper-block">
              <ml-button
                type="primary"
                status="normal"
                @click="showMessage('primary')"
                >默认按钮</ml-button
              >
              <ml-button
                type="primary"
                status="success"
                @click="showMessage('success')"
                >成功按钮</ml-button
              >
              <ml-button
                type="primary"
                status="warning"
                @click="showMessage('warning')"
                >警告按钮</ml-button
              >
              <ml-button
                type="primary"
                status="danger"
                @click="showMessage('danger')"
                >警告按钮</ml-button
              >
              <ml-button type="secondary" @click="showMessage('info')"
                >提示按钮</ml-button
              >
            </view>

            <view class="view-wrapper-block">
              <ml-message ref="messageRef" />
            </view>

            <view class="view-wrapper-block">
              <ml-input></ml-input>
            </view>
          </ml-config-provider>
        </template>
      </code-block>

      <code-block :code="templateCode[1].code" style="width: 100%">
        <template #title>
          <text>多语言</text>
        </template>
        <template #description>
          <text>
            设置 locale 属性。设置 en-US | zh-CN
            则使用组件库的默认语言包，或传入 CoreLocale 类型的对象自由定义</text
          >
        </template>
        <template #demo>
          <ml-config-provider locale="en-US">
            <view class="view-wrapper-block">
              <ml-input></ml-input>
              <ml-select model-value="a">
                <ml-option label="test" value="test"></ml-option>
              </ml-select>
            </view>
          </ml-config-provider>
        </template>
      </code-block>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import type {
    ConfigProviderProps,
    MessageInstance,
    MessageOptions
  } from '@meleon/uni-ui'
  import CodeBlock from '@/components/CodeBlock/index.vue'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } =
      appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const themes = ref<ConfigProviderProps['themes']>({
    primary: '#A6E7FF',
    success: '#99E5B3',
    warning: '#F5DEB3',
    danger: '#F08080'
  })

  const messageRef = ref<MessageInstance>()
  const showMessage = (type: MessageOptions['type']) => {
    if (!messageRef.value || !type) return
    messageRef.value[type]({
      content: `这是一条 ${type} 提示消息`,
      duration: 2000
    })
  }

  const templateCode = [
    {
      code: `
<ml-config-provider :themes="themes"></ml-config-provider>

const themes = ref<ConfigProviderProps['themes']>({
  primary: '#A6E7FF',
  success: '#99E5B3',
  warning: '#F5DEB3',
  danger: '#F08080'
})
      `
    },
    {
      code: `
<ml-config-provider locale='en-US'></ml-config-provider>
      `
    }
  ]
</script>

<style lang="less">
  @import './index.less';
</style>
