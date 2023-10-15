<template>
  <view class="input-view">
    <MlNavigator
      title="MlInputTag"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background-color="#7A98B3"
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
          <MlInputTag
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
              <MlButton size="mini" @click="inputSize = 'mini'">Mini</MlButton>
              <MlButton size="mini" @click="inputSize = 'small'">Small</MlButton>
              <MlButton size="mini" @click="inputSize = 'medium'">Medium</MlButton>
              <MlButton size="mini" @click="inputSize = 'large'">Large</MlButton>
            </view>
            <MlInputTag
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
            <MlInputTag
              v-model:model-value="templateMap[2].modelValue"
              :max-tag-count="2"
              placeholder="提示文字可自定义"
            />
          </view>
        </template>
      </CodeBlock>
      <!-- 禁用 -->
      <CodeBlock :code="templateMap[2].templateCode">
        <template #title>
          <text>标签类型</text>
        </template>
        <template #description>
          <text>通过设置 tag-type 属性来控制标签的类型，默认为 primary</text>
        </template>
        <template #demo>
          <MlInputTag
            v-model:model-value="templateMap[1].modelValue"
            tag-type="info"
            style="width: 100%"
          />
          <MlInputTag
            v-model:model-value="templateMap[1].modelValue"
            tag-type="primary"
            style="width: 100%"
          />
          <MlInputTag
            v-model:model-value="templateMap[1].modelValue"
            tag-type="success"
            style="width: 100%"
          />
          <MlInputTag
            v-model:model-value="templateMap[1].modelValue"
            tag-type="warning"
            style="width: 100%"
          />
          <MlInputTag
            v-model:model-value="templateMap[1].modelValue"
            tag-type="danger"
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
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlInputTag from '@/ml-ui/lib/ml-input-tag/index.vue'
  import MlIcon from '@/ml-ui/lib/ml-icon/index.vue'
  import MlButton from '@/ml-ui/lib/ml-button/index.vue'
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
      modelValue: ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7'],
      templateCode: ``
    },
    {
      modelValue: ['test1', 'test2', 'test3'],
      templateCode: ``
    },
    {
      modelValue: ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7'],
      templateCode: ``
    },
    {
      modelValue: [],
      templateCode: ``
    }
  ])

  const inputSize = ref<MlDesign.Size>('mini')
</script>

<style lang="less">
  @import './index.less';
</style>
