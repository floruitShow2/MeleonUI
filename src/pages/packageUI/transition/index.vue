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
      <!-- Fade transition -->
      <CodeBlock :code="templateMap[0].code">
        <template #title>
          <text>Fade 动画</text>
        </template>
        <template #description></template>
        <template #demo>
          <view class="button-container">
            <ml-button type="primary" shape="round" @click="transition('fade')"
              >fade</ml-button
            >
            <ml-button
              type="primary"
              shape="round"
              @click="transition('fade-up')"
              >fade-up</ml-button
            >
            <ml-button
              type="primary"
              shape="round"
              @click="transition('fade-right')"
              >fade-right</ml-button
            >
            <ml-button
              type="primary"
              shape="round"
              @click="transition('fade-down')"
              >fade-down</ml-button
            >
            <ml-button
              type="primary"
              shape="round"
              @click="transition('fade-left')"
              >fade-left</ml-button
            >
          </view>
        </template>
      </CodeBlock>

      <!-- Slide transition -->
      <CodeBlock :code="templateMap[0].code">
        <template #title>
          <text>Slide 动画</text>
        </template>
        <template #description></template>
        <template #demo>
          <view class="button-container">
            <ml-button
              type="primary"
              shape="round"
              @click="transition('slide-up')"
              >slide-up</ml-button
            >
            <ml-button
              type="primary"
              shape="round"
              @click="transition('slide-right')"
            >
              slide-right
            </ml-button>
            <ml-button
              type="primary"
              shape="round"
              @click="transition('slide-down')"
              >slide-down</ml-button
            >
            <ml-button
              type="primary"
              shape="round"
              @click="transition('slide-left')"
              >slide-left</ml-button
            >
          </view>
        </template>
      </CodeBlock>

      <!-- 自定义样式 -->
      <CodeBlock :code="templateMap[0].code">
        <template #title>
          <text>自定义样式</text>
        </template>
        <template #description></template>
        <template #demo>
          <view class="button-container">
            <ml-button type="primary" shape="round" @click="customTransition()">
              自定义样式
            </ml-button>
          </view>
        </template>
      </CodeBlock>

      <!-- 自定义节点 -->
      <CodeBlock :code="templateMap[0].code">
        <template #title>
          <text>自定义内容</text>
        </template>
        <template #description>
          支持通过插槽的形式，自定义过渡效果包裹的节点
        </template>
        <template #demo>
          <view class="button-container">
            <ml-button
              type="primary"
              shape="round"
              @click="customTransition2('slide-left')"
              >自定义内容</ml-button
            >
          </view>
          <ml-transition :appear="customAppear2" :name="name">
            <ml-cell
              :type="CellTypeEnum.TEXT"
              label="测试标题"
              value="测试内容"
              description="测试描述"
              allow-edit
              style="width: 100%"
            ></ml-cell>
          </ml-transition>
        </template>
      </CodeBlock>

      <ml-transition
        :appear="appear"
        :name="name"
        custom-class="block"
      ></ml-transition>

      <ml-transition
        :appear="customAppear"
        name=""
        :duration="1000"
        enter-class="custom-enter"
        enter-active-class="custom-enter-active"
        enter-to-class="custom-enter-to"
        leave-class="custom-leave"
        leave-active-class="custom-leave-active"
        leave-to-class="custom-leave-to"
        custom-class="block"
      ></ml-transition>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import { CellTypeEnum } from '@meleon/uni-ui/lib'
  import type { TransitionProps } from '@meleon/uni-ui/lib'
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

  const appear = ref(false)
  const name = ref<TransitionProps['name']>('fade')
  function transition(transition: TransitionProps['name']) {
    name.value = transition
    appear.value = true
    setTimeout(() => {
      appear.value = false
    }, 1500)
  }

  const customAppear = ref(false)
  function customTransition() {
    customAppear.value = !customAppear.value
  }
  const customAppear2 = ref(false)
  function customTransition2(transition: TransitionProps['name']) {
    name.value = transition
    customAppear2.value = !customAppear2.value
  }

  const templateMap = ref([
    {
      code: ``
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
