<template>
  <view class="uni_class">
    <ml-navigator
      title="ml-switch"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background="#7A98B3"
    />
    <view class="view-wrapper" :style="wrapperStyle">
      <code-block class="view-wrapper-block">
        <template #title>
          <text>开关类型</text>
        </template>
        <template #description>
          <text>ml-switch组件用于开启/关闭状态切换，支持 circle、square[默认]、line 三种类型。</text>
        </template>
        <template #demo>
          <view class="switch-wrapper">
            <ml-switch v-model="isActive"></ml-switch>

            <ml-switch v-model="isActive" type="circle"></ml-switch>

            <ml-switch v-model="isActive" type="line"></ml-switch>
          </view>
        </template>
      </code-block>

      <code-block class="view-wrapper-block">
        <template #title>
          <text>自定义开关状态文本</text>
        </template>
        <template #description>
          <text>设置 checked 和 unchecked 插槽内容，自定义开/关状态下的文本</text>
        </template>
        <template #demo>
          <ml-switch v-model="isActive">
            <template #checked>ON</template>
            <template #unchecked>OFF</template>
          </ml-switch>
        </template>
      </code-block>

      <code-block class="view-wrapper-block">
        <template #title>
          <text>自定义开关颜色</text>
        </template>
        <template #description>
          <text>设置 checkedColor 和 uncheckedColor 的值 </text>
        </template>
        <template #demo>
          <ml-switch
            v-model="isActive"
            checked-color="var(--success-color-6)"
            unchecked-color="var(--danger-color-6)"
          ></ml-switch>
        </template>
      </code-block>

      <code-block class="view-wrapper-block">
        <template #title>
          <text>禁用状态</text>
        </template>
        <template #description>
          <text>设置 disabled 判断是否禁用开关 </text>
        </template>
        <template #demo>
          <ml-switch
            v-model="isActive"
            disabled
          ></ml-switch>
        </template>
      </code-block>

      <code-block class="view-wrapper-block">
        <template #title>
          <text>切换拦截</text>
        </template>
        <template #description>
          <text> 传入 beforeSwitch 函数，根据返回值判断是否触发切换</text>
        </template>
        <template #demo>
          <ml-switch
            v-model="isActive"
            :before-switch="beforeSwitch"
          ></ml-switch>
        </template>
      </code-block>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import CodeBlock from '@/components/CodeBlock/index.vue'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const isActive = ref(false)
  const beforeSwitch = () => {
    uni.showToast({
      title: 'beforeSwitch',
      icon: 'none'
    })
    return true
  }
</script>

<style lang="less">
  @import './index.less';
</style>