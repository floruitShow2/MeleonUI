<template>
  <view class="button-view">
    <MlNavigator
      title="MlButton"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="button-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text>
            ml-button 组件的基础用法，包括主要按钮 primary、次要按钮 secondary、线框按钮 outline
            以及文本按钮 text
          </text>
        </template>
        <template #demo>
          <view class="cell-container">
            <ml-cell-group title="测试分组" style="width: 100%">
              <ml-cell
                :type="CellTypeEnum.TEXT"
                label="测试标题"
                value="测试内容"
                description="测试描述"
                disabled
                allow-edit
                style="width: 100%"
                @change="handleCellChange"
              ></ml-cell>
              <ml-cell
                :type="CellTypeEnum.BUTTON"
                label="测试按钮"
                btn-status="danger"
                disabled
                style="width: 100%"
                @btn-click="handleClick"
              ></ml-cell>
              <ml-cell
                :type="CellTypeEnum.NAV"
                label="测试回到首页"
                value="回首页"
                url="/pages/home/index"
                :disabled="false"
                style="width: 100%"
              >
                <template #rightIcon>
                  <ml-icon name="ml-arrow-right--line" color="var(--info-color-7)"></ml-icon>
                </template>
                <template #value>
                  <text style="font-size: 14px; color: var(--info-color-7)">通过插槽展示内容</text>
                </template>
              </ml-cell>
            </ml-cell-group>
          </view>
        </template>
      </CodeBlock>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/store'
  import MlNavigator from '@/ml-ui/lib/ml-navigator/index.vue'
  import { CellTypeEnum, type CellChangePayload, type CellProps } from '@meleon/uni-ui/index'
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
      templateCode: `<view class="button-container">
    <MlButton type="primary">Primary</MlButton>
    <MlButton>Secondary</MlButton>
    <MlButton type="outline">Outline</MlButton>
    <MlButton type="text">Text</MlButton>
</view>`
    }
  ])

  const handleCellChange = (payload: CellChangePayload) => {
    console.log(payload)
  }

  const handleClick = ({ cell }: { cell: CellProps }) => {
    console.log(cell)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
