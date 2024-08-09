<template>
  <view class="select-view">
    <ml-navigator
      title="ml-select"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background="#7A98B3"
    />
    <view class="select-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text>ml-input 组件的基础用法，可使用键盘输入</text>
        </template>
        <template #demo>
          <ml-select v-model:model-value="templateMap[0].modelValue">
            <ml-option value="1" label="选项1" />
            <ml-option value="2" label="选项2" />
            <ml-option value="3" label="选项3" />
          </ml-select>
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
          <view class="select-demo-size">
            <view class="select-demo-size-buttons">
              <ml-button size="mini" @click="selectSize = 'mini'">Mini</ml-button>
              <ml-button size="mini" @click="selectSize = 'small'">Small</ml-button>
              <ml-button size="mini" @click="selectSize = 'medium'">Medium</ml-button>
              <ml-button size="mini" @click="selectSize = 'large'">Large</ml-button>
            </view>
            <ml-select v-model:modelValue="templateMap[1].modelValue" :size="selectSize">
              <ml-option value="1" label="选项1" />
              <ml-option value="2" label="选项2" />
              <ml-option value="3" label="选项3" />
            </ml-select>
          </view>
        </template>
      </CodeBlock>
      <!-- 支持多选 -->
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>支持多选</text>
        </template>
        <template #description>
          <text>
            通过设置 multiple 属性可开启多选模式，或添加 max-tag-count 属性，仅展示一部分选中的标签
          </text>
        </template>
        <template #demo>
          <ml-select v-model:modelValue="templateMap[2].modelValue" multiple :max-tag-count="1">
            <ml-option value="1" label="选项1" />
            <ml-option value="2" label="选项2" />
            <ml-option value="3" label="选项3" />
          </ml-select>
        </template>
      </CodeBlock>
      <!-- 可搜索 -->
      <CodeBlock :code="templateMap[3].templateCode">
        <template #title>
          <text>可搜索</text>
        </template>
        <template #description>
          <text>当设置 filterable 后，可使用键盘输入模糊搜索符合条件选项</text>
        </template>
        <template #demo>
          <ml-select v-model:modelValue="templateMap[1].modelValue" filterable>
            <ml-option value="1" label="选项1" />
            <ml-option value="2" label="选项2" />
            <ml-option value="3" label="选项3" />
          </ml-select>
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
      modelValue: '1',
      templateCode: `<ml-select v-model:model-value="modelValue">
  <ml-option value="1" label="选项1" />
  <ml-option value="2" label="选项2" />
  <ml-option value="3" label="选项3" />
</ml-select>`
    },
    {
      modelValue: '1',
      templateCode: `<view class="select-demo-size-buttons">
  <ml-button size="mini" @click="selectSize = 'mini'">Mini</ml-button>
  <ml-button size="mini" @click="selectSize = 'small'">Small</ml-button>
  <ml-button size="mini" @click="selectSize = 'medium'">Medium</ml-button>
  <ml-button size="mini" @click="selectSize = 'large'">Large</ml-button>
</view>
<ml-select v-model:modelValue="modelValue" :size="selectSize">
  <ml-option value="1" label="选项1" />
  <ml-option value="2" label="选项2" />
  <ml-option value="3" label="选项3" />
</ml-select>`
    },
    {
      modelValue: ['1'],
      templateCode: `<ml-select v-model:modelValue="modelValue" multiple :max-tag-count="1">
  <ml-option value="1" label="选项1" />
  <ml-option value="2" label="选项2" />
  <ml-option value="3" label="选项3" />
</ml-select>`
    },
    {
      modelValue: ['1'],
      templateCode: `<ml-select v-model:modelValue="modelValue" filterable>
  <ml-option value="1" label="选项1" />
  <ml-option value="2" label="选项2" />
  <ml-option value="3" label="选项3" />
</ml-select>`
    }
  ])

  const selectSize = ref<Meleon.MlSize>('small')
</script>

<style lang="less">
  @import './index.less';
</style>
