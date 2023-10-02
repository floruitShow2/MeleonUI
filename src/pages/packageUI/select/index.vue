<template>
  <view class="select-view">
    <MlNavigator
      title="MlSelect"
      title-color="#FFFFFF"
      has-back
      icon-color="#FFFFFF"
      background-color="#7A98B3"
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
          <MlSelect v-model:model-value="templateMap[0].modelValue">
            <MlOption value="1" label="选项1" />
            <MlOption value="2" label="选项2" />
            <MlOption value="3" label="选项3" />
          </MlSelect>
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
              <MlButton size="mini" @click="selectSize = 'mini'">Mini</MlButton>
              <MlButton size="mini" @click="selectSize = 'small'">Small</MlButton>
              <MlButton size="mini" @click="selectSize = 'medium'">Medium</MlButton>
              <MlButton size="mini" @click="selectSize = 'large'">Large</MlButton>
            </view>
            <MlSelect v-model:modelValue="templateMap[1].modelValue" :size="selectSize">
              <MlOption value="1" label="选项1" />
              <MlOption value="2" label="选项2" />
              <MlOption value="3" label="选项3" />
            </MlSelect>
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
          <MlSelect v-model:modelValue="templateMap[1].modelValue" multiple :max-tag-count="1">
            <MlOption value="1" label="选项1" />
            <MlOption value="2" label="选项2" />
            <MlOption value="3" label="选项3" />
          </MlSelect>
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
          <MlSelect v-model:modelValue="templateMap[1].modelValue" filterable>
            <MlOption value="1" label="选项1" />
            <MlOption value="2" label="选项2" />
            <MlOption value="3" label="选项3" />
          </MlSelect>
        </template>
      </CodeBlock>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlButton from '@/ml-ui/lib/ml-button/index.vue'
  import MlSelect from '@/ml-ui/lib/ml-select/index.vue'
  import MlOption from '@/ml-ui/lib/ml-option/index.vue'
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
      templateCode: `<MlSelect v-model:model-value="modelValue">
  <MlOption value="1" label="选项1" />
  <MlOption value="2" label="选项2" />
  <MlOption value="3" label="选项3" />
</MlSelect>`
    },
    {
      modelValue: '1',
      templateCode: `<view class="select-demo-size-buttons">
  <MlButton size="mini" @click="selectSize = 'mini'">Mini</MlButton>
  <MlButton size="mini" @click="selectSize = 'small'">Small</MlButton>
  <MlButton size="mini" @click="selectSize = 'medium'">Medium</MlButton>
  <MlButton size="mini" @click="selectSize = 'large'">Large</MlButton>
</view>
<MlSelect v-model:modelValue="modelValue" :size="selectSize">
  <MlOption value="1" label="选项1" />
  <MlOption value="2" label="选项2" />
  <MlOption value="3" label="选项3" />
</MlSelect>`
    },
    {
      modelValue: '1',
      templateCode: `<MlSelect v-model:modelValue="modelValue" multiple :max-tag-count="1">
  <MlOption value="1" label="选项1" />
  <MlOption value="2" label="选项2" />
  <MlOption value="3" label="选项3" />
</MlSelect>`
    },
    {
      modelValue: ['1'],
      templateCode: `<MlSelect v-model:modelValue="modelValue" filterable>
  <MlOption value="1" label="选项1" />
  <MlOption value="2" label="选项2" />
  <MlOption value="3" label="选项3" />
</MlSelect>`
    }
  ])

  const selectSize = ref<MlDesign.Size>('small')
</script>

<style lang="less">
  @import './index.less';
</style>
