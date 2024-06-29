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
      <CodeBlock :code="templateMap[0].code">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text>单选框的基本用法。</text>
        </template>
        <template #demo>
          <view class="checkbox-container">
            <ml-checkbox v-model:checked="checked1">Radio</ml-checkbox>
            <ml-checkbox indeterminate>Radio</ml-checkbox>
            <ml-checkbox v-model:checked="checked1" disabled>Radio</ml-checkbox>
          </view>
          <view class="checkbox-container">
            <ml-checkbox v-model:checked="checked1">
              <MlTag model-value="Radio2" size="mini"></MlTag>
            </ml-checkbox>
          </view>
        </template>
      </CodeBlock>
      <!-- 单选&多选 -->
      <CodeBlock :code="templateMap[1].code">
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
            <ml-checkbox-group v-model:checked-list="checked2">
              <ml-checkbox value="A">RadioA</ml-checkbox>
              <ml-checkbox value="B">RadioB</ml-checkbox>
              <ml-checkbox value="C">RadioC</ml-checkbox>
              <ml-checkbox value="D">RadioD</ml-checkbox>
              <ml-checkbox value="E">RadioE</ml-checkbox>
            </ml-checkbox-group>
          </view>
          <view class="checkbox-container">
            <ml-checkbox-group v-model:checked-list="checked3" mode="multi" :max="3" :min="1">
              <ml-checkbox value="A">RadioA</ml-checkbox>
              <ml-checkbox value="B">RadioB</ml-checkbox>
              <ml-checkbox value="C">RadioC</ml-checkbox>
              <ml-checkbox value="D">RadioD</ml-checkbox>
              <ml-checkbox value="E">RadioE</ml-checkbox>
            </ml-checkbox-group>
          </view>
        </template>
      </CodeBlock>
      <!-- 选项组方向 -->
      <CodeBlock :code="templateMap[2].code">
        <template #title>
          <text>选项组方向</text>
        </template>
        <template #description>
          <text> 设置 direction="vertical" 属性可以控制选项组垂直排列 </text>
        </template>
        <template #demo>
          <view class="checkbox-container">
            <ml-checkbox-group v-model:checked-list="checked4" direction="vertical">
              <ml-checkbox value="A">RadioA</ml-checkbox>
              <ml-checkbox value="B">RadioB</ml-checkbox>
              <ml-checkbox value="C">RadioC</ml-checkbox>
              <ml-checkbox value="D">RadioD</ml-checkbox>
              <ml-checkbox value="E">RadioE</ml-checkbox>
            </ml-checkbox-group>
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
  import MlTag from '@/ml-ui/lib/ml-tag/index.vue'
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
      code: `
<ml-checkbox v-model:checked="checked1">Radio</ml-checkbox>

<ml-checkbox indeterminate>Radio</ml-checkbox>

<ml-checkbox v-model:checked="checked1" disabled>Radio</ml-checkbox>
      `
    },
    {
      code: `
<ml-checkbox-group v-model:checked-list="checked2">
  <ml-checkbox value="A">RadioA</ml-checkbox>
  <ml-checkbox value="B">RadioB</ml-checkbox>
  <ml-checkbox value="C">RadioC</ml-checkbox>
  <ml-checkbox value="D">RadioD</ml-checkbox>
  <ml-checkbox value="E">RadioE</ml-checkbox>
</ml-checkbox-group>

<ml-checkbox-group v-model:checked-list="checked3" mode="multi" :max="3" :min="1">
  <ml-checkbox value="A">RadioA</ml-checkbox>
  <ml-checkbox value="B">RadioB</ml-checkbox>
  <ml-checkbox value="C">RadioC</ml-checkbox>
  <ml-checkbox value="D">RadioD</ml-checkbox>
  <ml-checkbox value="E">RadioE</ml-checkbox>
</ml-checkbox-group>
      `
    },
    {
      code: `
<ml-checkbox-group v-model:checked-list="checked4" direction="vertical">
  <ml-checkbox value="A">RadioA</ml-checkbox>
  <ml-checkbox value="B">RadioB</ml-checkbox>
  <ml-checkbox value="C">RadioC</ml-checkbox>
  <ml-checkbox value="D">RadioD</ml-checkbox>
  <ml-checkbox value="E">RadioE</ml-checkbox>
</ml-checkbox-group>
      `
    }
  ])
</script>

<style lang="less">
  @import './index.less';
</style>
