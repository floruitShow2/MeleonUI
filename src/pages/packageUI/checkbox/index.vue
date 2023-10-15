<template>
  <view class="checkbox-view">
    <MlNavigator
      title="MlButton"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="checkbox-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text>单选框的基本用法。</text>
        </template>
        <template #demo>
          <view class="checkbox-container">
            <MlCheckbox v-model:checked="checked1">Radio</MlCheckbox>
            <MlCheckbox indeterminate>Radio</MlCheckbox>
            <MlCheckbox v-model:checked="checked1" disabled>Radio</MlCheckbox>
          </view>
          <view class="checkbox-container">
            <MlCheckbox v-model:checked="checked1">
              <MlTag model-value="Radio2" size="mini"></MlTag>
            </MlCheckbox>
          </view>
        </template>
      </CodeBlock>
      <!-- 单选&多选 -->
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>单选或多选</text>
        </template>
        <template #description>
          <text>
            设置 mode 属性可以控制选项组模式为“单选”或“多选”。设置为“多选”状态时，可以传入 min/max
            变量控制可选择的数量
          </text>
        </template>
        <template #demo>
          <view class="checkbox-container">
            <MlCheckboxGroup v-model:checked-list="checked2">
              <MlCheckbox value="A">RadioA</MlCheckbox>
              <MlCheckbox value="B">RadioB</MlCheckbox>
              <MlCheckbox value="C">RadioC</MlCheckbox>
              <MlCheckbox value="D">RadioD</MlCheckbox>
              <MlCheckbox value="E">RadioE</MlCheckbox>
            </MlCheckboxGroup>
          </view>
          <view class="checkbox-container">
            <MlCheckboxGroup v-model:checked-list="checked3" mode="multi" :max="3" :min="1">
              <MlCheckbox value="A">RadioA</MlCheckbox>
              <MlCheckbox value="B">RadioB</MlCheckbox>
              <MlCheckbox value="C">RadioC</MlCheckbox>
              <MlCheckbox value="D">RadioD</MlCheckbox>
              <MlCheckbox value="E">RadioE</MlCheckbox>
            </MlCheckboxGroup>
          </view>
        </template>
      </CodeBlock>
      <!-- 选项组方向 -->
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>选项组方向</text>
        </template>
        <template #description>
          <text> 设置 direction="vertical" 属性可以控制选项组垂直排列 </text>
        </template>
        <template #demo>
          <view class="checkbox-container">
            <MlCheckboxGroup v-model:checked-list="checked4" direction="vertical">
              <MlCheckbox value="A">RadioA</MlCheckbox>
              <MlCheckbox value="B">RadioB</MlCheckbox>
              <MlCheckbox value="C">RadioC</MlCheckbox>
              <MlCheckbox value="D">RadioD</MlCheckbox>
              <MlCheckbox value="E">RadioE</MlCheckbox>
            </MlCheckboxGroup>
          </view>
        </template>
      </CodeBlock>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import MlIcon from '@/ml-ui/lib/ml-icon/index.vue'
  import MlTag from '@/ml-ui/lib/ml-tag/index.vue'
  import MlCheckbox from '@/ml-ui/lib/ml-checkbox/index.vue'
  import MlCheckboxGroup from '@/ml-ui/lib/ml-checkbox-group/index.vue'
  import CodeBlock from '@/components/CodeBlock/index.vue'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const checked1 = ref(false)
  // 单选选项组
  const checked2 = ref<string[]>([])
  // 多选选项组
  const checked3 = ref<string[]>(['A', 'B'])
  // 垂直选项组
  const checked4 = ref<string[]>(['A', 'B'])
  watch(
    checked2,
    (newVal) => {
      console.log('z', newVal)
    },
    { deep: true }
  )

  const templateMap = ref([
    {
      templateCode: `>`
    },
    {
      templateCode: ``
    },
    {
      templateCode: ``
    },
    {
      templateCode: ``
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
