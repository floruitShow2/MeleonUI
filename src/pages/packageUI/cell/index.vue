<template>
  <view class="button-view">
    <ml-navigator
      title="ml-cell"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background="#7A98B3"
    />
    <view class="button-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].code">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text>
            ml-cell 目前支持三种：TEXT | BUTTON | NAV
            类型，可以单独使用，也可以与 ml-cell-group 组件组合使用
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
                :type="CellTypeEnum.SWITCH"
                label="开关单元格"
                description="尝试下开关"
                :value="false"
                :disabled="false"
                style="width: 100%"
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
                  <ml-icon
                    name="ml-arrow-right--line"
                    color="var(--info-color-7)"
                  ></ml-icon>
                </template>
                <template #value>
                  <text style="font-size: 14px; color: var(--info-color-7)"
                    >通过插槽展示内容</text
                  >
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
  import {
    CellTypeEnum,
    type CellChangePayload,
    type CellProps
  } from '@meleon/uni-ui/index'
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

  const templateMap = ref([
    {
      code: `<ml-cell-group title="测试分组" style="width: 100%">
  <ml-cell
    :type="CellTypeEnum.TEXT"
    label="测试标题"
    value="测试内容"
    description="测试描述"
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
</ml-cell-group>`
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
