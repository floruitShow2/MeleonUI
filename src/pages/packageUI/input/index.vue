<template>
  <view class="input-view">
    <ml-navigator
      title="ml-input"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background="#7A98B3"
    />
    <view class="input-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text>ml-input 组件的基础用法，可使用键盘输入</text>
        </template>
        <template #demo>
          <ml-input
            v-model:model-value="templateMap[0].modelValue"
            placeholder="提示文字可自定义"
          />
        </template>
      </CodeBlock>
      <!-- 尺寸控制 -->
      <CodeBlock :code="templateMap[1].templateCode">
        <template #title>
          <text>输入框尺寸</text>
        </template>
        <template #description>
          <text>输入框定义了四种默认尺寸 mini, small, medium, large，默认为 small</text>
        </template>
        <template #demo>
          <view class="input-demo-size">
            <view class="input-demo-size-buttons">
              <ml-button size="mini" @click="inputSize = 'mini'">Mini</ml-button>
              <ml-button size="mini" @click="inputSize = 'small'">Small</ml-button>
              <ml-button size="mini" @click="inputSize = 'medium'">Medium</ml-button>
              <ml-button size="mini" @click="inputSize = 'large'">Large</ml-button>
            </view>
            <ml-input
              v-model:model-value="templateMap[1].modelValue"
              :size="inputSize"
              style="width: 100%"
            />
          </view>
        </template>
      </CodeBlock>
      <!-- 前后缀 -->
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>前缀和后缀</text>
        </template>
        <template #description>
          <text>通过指定 prefix 和 suffix 插槽来在输入框内添加前缀和后缀</text>
        </template>
        <template #demo>
          <view class="input-demo-fix">
            <!-- 添加前缀 -->
            <ml-input
              v-model:model-value="templateMap[2].modelValue"
              :size="inputSize"
              style="width: 100%"
            >
              <template #prefix>
                <ml-icon name="ml-search" :size="18" />
              </template>
            </ml-input>
            <!-- 添加后缀 -->
            <ml-input
              v-model:model-value="templateMap[2].modelValue"
              :size="inputSize"
              style="width: 100%"
            >
              <template #suffix>
                <ml-icon name="ml-setting" :size="18" />
              </template>
            </ml-input>
            <!-- type 为 password 时，添加默认后缀 -->
            <ml-input
              v-model:model-value="templateMap[2].modelValue"
              type="password"
              style="width: 100%"
            />
          </view>
        </template>
      </CodeBlock>
      <!-- 禁用 -->
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>禁用状态</text>
        </template>
        <template #description>
          <text>通过设置 disabled 属性来禁用用户操作</text>
        </template>
        <template #demo>
          <ml-input
            v-model:model-value="templateMap[3].modelValue"
            disabled
            :size="inputSize"
            style="width: 100%"
          />
        </template>
      </CodeBlock>
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

  const templateMap = ref([
    {
      modelValue: '',
      templateCode: `<ml-input
  v-model:model-value="modelValue"
  placeholder="提示文字可自定义"
/>`
    },
    {
      modelValue: '',
      templateCode: `<ml-input
  v-model:model-value="modelValue"
  size="mini"
/>`
    },
    {
      modelValue: '',
      templateCode: `<!-- 添加前缀 -->
<ml-input
  v-model:model-value="modelValue"
  :size="inputSize"
  style="width: 100%"
>
  <template #prefix>
    <ml-icon name="ml-search" :size="18" />
  </template>
</ml-input>


<!-- 添加后缀 -->
<ml-input
  v-model:model-value="modelValue"
  :size="inputSize"
  style="width: 100%"
>
  <template #suffix>
    <ml-icon name="ml-setting" :size="18" />
  </template>
</ml-input>


<!-- type 为 password 时，添加默认后缀 -->
<ml-input
  v-model:model-value="modelValue"
  type="password"
  style="width: 100%"
/>`
    },
    {
      modelValue: '',
      templateCode: `<ml-input
  v-model:model-value="modelValue"
  disabled
  :size="inputSize"
  style="width: 100%"
/>`
    }
  ])

  const inputSize = ref<Meleon.MlSize>('mini')
</script>

<style lang="less">
  @import './index.less';
</style>
