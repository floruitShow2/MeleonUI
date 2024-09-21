<template>
  <view class="collapse-view">
    <ml-navigator
      title="ml-collapse"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background="#7A98B3"
    />
    <view class="view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock>
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text>
            用于将复杂的内容区域分组和隐藏，可折叠或展开。默认可以展开多个面板。
          </text>
        </template>
        <template #demo>
          <ml-collapse v-model:activeKeys="activeKeys1">
            <ml-collapse-item prop="1" title="分组1">
              <ml-cell
                label="自定义内容"
                description="描述内容"
                value="aaa"
                :type="CellTypeEnum.TEXT"
              ></ml-cell>
            </ml-collapse-item>
            <ml-collapse-item prop="2" title="分组2" disabled>
              <ml-cell
                label="自定义内容"
                description="描述内容"
                :type="CellTypeEnum.SWITCH"
              ></ml-cell>
            </ml-collapse-item>
            <ml-collapse-item prop="3" title="分组3">
              <ml-cell
                label="自定义内容"
                :type="CellTypeEnum.BUTTON"
              ></ml-cell>
            </ml-collapse-item>
          </ml-collapse>
        </template>
      </CodeBlock>
      <!-- 手风琴模式 -->
      <CodeBlock>
        <template #title>
          <text>手风琴模式</text>
        </template>
        <template #description>
          <text>
            通过 accordion 开启手风琴模式，同时只能打开一个面板。
          </text>
        </template>
        <template #demo>
          <ml-collapse v-model:activeKeys="activeKeys2" accordion>
            <ml-collapse-item prop="1" title="分组1">
              <ml-cell
                label="自定义内容"
                description="描述内容"
                value="aaa"
                :type="CellTypeEnum.TEXT"
              ></ml-cell>
            </ml-collapse-item>
            <ml-collapse-item prop="2" title="分组2">
              <ml-cell
                label="自定义内容"
                description="描述内容"
                :type="CellTypeEnum.SWITCH"
              ></ml-cell>
            </ml-collapse-item>
            <ml-collapse-item prop="3" title="分组3">
              <ml-cell
                label="自定义内容"
                value="bbb"
                :type="CellTypeEnum.TEXT"
              ></ml-cell>
            </ml-collapse-item>
          </ml-collapse>
        </template>
      </CodeBlock>
      <!-- 无边框 -->
      <CodeBlock>
        <template #title>
          <text>无边框模式</text>
        </template>
        <template #description>
          <text>
            通过设置 bordered="false" 隐藏边框。
          </text>
        </template>
        <template #demo>
          <ml-collapse v-model:activeKeys="activeKeys3" :bordered="false">
            <ml-collapse-item prop="1" title="分组1" :style="{ borderRadius: '10px' }">
              <ml-cell
                label="自定义内容"
                description="描述内容"
                value="aaa"
                :type="CellTypeEnum.TEXT"
              ></ml-cell>
            </ml-collapse-item>
            <ml-collapse-item prop="2" title="分组2">
              <ml-cell
                label="自定义内容"
                description="描述内容"
                :type="CellTypeEnum.SWITCH"
              ></ml-cell>
            </ml-collapse-item>
            <ml-collapse-item prop="3" title="分组3">
              <ml-cell
                label="自定义内容"
                value="bbb"
                :type="CellTypeEnum.TEXT"
              ></ml-cell>
            </ml-collapse-item>
          </ml-collapse>
        </template>
      </CodeBlock>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useAppStore } from '@/store'
  import { CellTypeEnum } from '@/ml-ui/lib'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
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

  const activeKeys1 = ref(['1'])
  const activeKeys2 = ref(['1'])
  const activeKeys3 = ref(['1'])

</script>

<style lang="less">
  @import './index.less';
</style>
