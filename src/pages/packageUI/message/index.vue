<template>
  <view class="message-view">
    <ml-navigator
      title="ml-message"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background="#7A98B3"
    />
    <view class="message-view-wrapper" :style="wrapperStyle">
      <ml-message ref="messageRef" />
      <!-- 基础用法 -->
      <code-block :code="templateMap[0].templateCode">
        <template #title>
          <text>{{ templateMap[0].title }}</text>
        </template>
        <template #description>
          <text>
            {{ templateMap[0].desc }}
          </text>
        </template>
        <template #demo>
          <view class="button-container">
            <ml-button type="primary" @click="showMessage('primary')"
              >Primary</ml-button
            >
            <ml-button
              type="primary"
              status="success"
              @click="showMessage('success')"
            >
              Success
            </ml-button>
            <ml-button
              type="primary"
              status="warning"
              @click="showMessage('warning')"
            >
              Warning
            </ml-button>
            <ml-button
              type="primary"
              status="danger"
              @click="showMessage('danger')"
            >
              Danger
            </ml-button>
            <ml-button type="secondary" @click="showMessage('info')"
              >Info</ml-button
            >
          </view>
        </template>
      </code-block>
      <!-- 底部展示 -->
      <code-block :code="templateMap[1].templateCode">
        <template #title>
          <text>{{ templateMap[1].title }}</text>
        </template>
        <template #description>
          <text>
            {{ templateMap[1].desc }}
          </text>
        </template>
        <template #demo>
          <view class="button-container">
            <ml-button type="primary" @click="showMessagePosition('primary')"
              >Primary</ml-button
            >
            <ml-button
              type="primary"
              status="success"
              @click="showMessagePosition('success')"
            >
              Success
            </ml-button>
            <ml-button
              type="primary"
              status="warning"
              @click="showMessagePosition('warning')"
            >
              Warning
            </ml-button>
            <ml-button
              type="primary"
              status="danger"
              @click="showMessagePosition('danger')"
            >
              Danger
            </ml-button>
          </view>
        </template>
      </code-block>
      <!-- 持续时间 -->
      <code-block :code="templateMap[2].templateCode">
        <template #title>
          <text>{{ templateMap[2].title }}</text>
        </template>
        <template #description>
          <text>
            {{ templateMap[2].desc }}
          </text>
        </template>
        <template #demo>
          <view class="duration-container">
            <ml-input v-model:model-value="duration" size="mini" />
            <ml-button type="primary" @click="showMessageDuration"
              >Primary</ml-button
            >
          </view>
        </template>
      </code-block>
      <!-- 可手动关闭 -->
      <code-block :code="templateMap[3].templateCode">
        <template #title>
          <text>{{ templateMap[3].title }}</text>
        </template>
        <template #description>
          <text>
            {{ templateMap[3].desc }}
          </text>
        </template>
        <template #demo>
          <view class="button-container">
            <ml-button type="primary" @click="showMessageClosable"
              >Primary</ml-button
            >
          </view>
        </template>
      </code-block>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import type { MessageInstance, MessageOptions } from '@/ml-ui/lib'
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

  const messageRef = ref<MessageInstance>()

  const idx = ref(1)

  const showMessage = (type: MessageOptions['type']) => {
    if (!messageRef.value || !type) return
    messageRef.value[type]({
      content: type + idx.value++,
      duration: 2000
    })
  }

  const duration = ref(2000)
  const showMessageDuration = () => {
    messageRef.value?.primary({
      content: `手动设置消息显示时间：${duration.value}`,
      duration: Number(duration.value)
    })
  }

  const showMessageClosable = () => {
    messageRef.value?.primary({
      content: '可关闭消息提示阿斯顿法国红酒看来',
      closable: true,
      duration: 5000
    })
  }

  const showMessagePosition = (
    type: 'primary' | 'info' | 'success' | 'danger' | 'warning'
  ) => {
    if (!messageRef.value) return
    messageRef.value[type]({
      content: type + idx.value++,
      duration: 2000,
      position: 'bottom'
    })
  }

  const templateMap = ref([
    {
      title: '基础用法',
      desc: '用来显示「成功、警告、消息、错误」类的操作反馈, 用于主动操作后的反馈提示',
      templateCode: `<ml-message ref="messageRef" />

const messageRef = ref<MessageInstance>()

const idx = ref(1)

const showMessage = (
  type: 'primary' | 'info' | 'success' | 'danger' | 'warning'
) => {
  if (!messageRef.value) return
  messageRef.value[type]({
    content: type + idx.value++,
    duration: 2000
  })
}`
    },
    {
      title: '底部展示',
      desc: '可以设置 position 属性让消息在页面底部弹出',
      templateCode: `const showMessagePosition = () => {
  messageRef.value?.primary({
    content: '消息在底部展示',
    duration: 2000,
    position: 'bottom'
  })
}`
    },
    {
      title: '持续时间',
      desc: '可以设置 duration 属性设置消息的持续时间，单位为毫秒',
      templateCode: `const duration = ref(2000)
const showMessageDuration = () => {
  messageRef.value?.primary({
    content: \`手动设置消息显示时间：${duration.value}\`,
    duration: Number(duration.value)
  })
}`
    },
    {
      title: '可关闭',
      desc: '可以设置 closable 属性添加关闭按钮，点击后直接关闭消息提示【下面的按钮点击后弹出的消息框会持续 5 秒，可以点击直接关闭】',
      templateCode: `const showMessageClosable = () => {
  messageRef.value?.primary({
    content: '可关闭消息提示阿斯顿法国红酒看来',
    closable: true,
    duration: 5000
  })
}`
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
