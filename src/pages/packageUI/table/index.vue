<template>
  <view class="table-view">
    <ml-navigator
      title="ml-table"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background="#7A98B3"
    />
    <view class="table-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].code">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text> 基础用法，支持数据渲染 </text>
        </template>
        <template #demo>
          <view class="table-container">
            <ml-table
              :data="tableData"
              size="mini"
              stripe
              border
              :loading="false"
              style="width: 100%"
              @row-click="onRowClick"
              @cell-click="onCellClick"
            >
              <ml-table-column type="index"></ml-table-column>
              <ml-table-column prop="name" label="姓名"></ml-table-column>
              <ml-table-column prop="age" label="年龄"></ml-table-column>
              <ml-table-column prop="gender" label="性别"></ml-table-column>
            </ml-table>
          </view>
        </template>
      </CodeBlock>
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].code">
        <template #title>
          <text>加载中</text>
        </template>
        <template #description>
          <text> 加载状态 </text>
        </template>
        <template #demo>
          <view class="table-container">
            <ml-table
              :data="tableData"
              size="mini"
              stripe
              border
              :loading="true"
              style="width: 100%"
              @row-click="onRowClick"
              @cell-click="onCellClick"
            >
              <ml-table-column type="index"></ml-table-column>
              <ml-table-column prop="name" label="姓名"></ml-table-column>
              <ml-table-column prop="age" label="年龄"></ml-table-column>
              <ml-table-column prop="gender" label="性别"></ml-table-column>
            </ml-table>
          </view>
        </template>
      </CodeBlock>
      <!-- 固定列 -->
      <CodeBlock :code="templateMap[0].code">
        <template #title>
          <text>自定义节点</text>
        </template>
        <template #description>
          <text> 支持固定列及节点自定义节点等功能 </text>
          <text>
            注：尽量不要在设置 fixed 的同时开启 refresher-enabled 下拉刷新
          </text>
        </template>
        <template #demo>
          <view class="table-container">
            <ml-table
              :data="tableData"
              size="mini"
              stripe
              border
              :loading="false"
              :refresher-enabled="false"
              :refresher-interval="2000"
              style="width: 100%"
              @row-click="onRowClick"
              @cell-click="onCellClick"
            >
              <template #cell="{ column, row }">
                <block v-if="column.property === 'gender'">
                  <ml-tag
                    :model-value="row[column.property]"
                    type="primary"
                    size="mini"
                  ></ml-tag>
                </block>
                <block v-else-if="column.property === 'age'">
                  <ml-count-to
                    :to="row[column.property]"
                    animation
                    :value-style="{
                      fontSize: '14px',
                      color: 'var(--info-color-8)'
                    }"
                  ></ml-count-to>
                </block>
                <text v-else>{{
                  column.property && row[column.property]
                }}</text>
              </template>
              <ml-table-column type="index" fixed="left"></ml-table-column>
              <ml-table-column prop="name" label="姓名" fixed></ml-table-column>
              <ml-table-column prop="age" label="年龄"></ml-table-column>
              <ml-table-column prop="gender" label="性别"></ml-table-column>
            </ml-table>
          </view>
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
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } =
      appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const templateMap = ref([
    {
      modelVisible: false,
      code: `
<ml-table
  :data="tableData"
  size="mini"
  stripe
  border
  :height="200"
  :loading="false"
  :refresher-enabled="false"
  :refresher-interval="2000"
  style="width: 100%"
  @row-click="onRowClick"
  @cell-click="onCellClick"
>
  <template #cell="{ column, row }">
    <block v-if="column.property === 'gender'">
      <ml-tag :model-value="row[column.property]" type="primary" size="mini"></ml-tag>
    </block>
    <block v-else-if="column.property === 'age'">
      <ml-count-to
        :to="row[column.property]"
        animation
        :value-style="{ fontSize: '14px', color: 'var(--info-color-8)' }"
      ></ml-count-to>
    </block>
    <text v-else>{{ column.property && row[column.property] }}</text>
  </template>
  <ml-table-column type="index" fixed="left"></ml-table-column>
  <ml-table-column prop="name" label="姓名" fixed></ml-table-column>
  <ml-table-column prop="age" label="年龄"></ml-table-column>
  <ml-table-column prop="gender" label="性别"></ml-table-column>
</ml-table>      

`
    },
    {
      modelVisible: false,
      code: ``
    },
    {
      modelVisible: false,
      code: ``
    },
    {
      modelVisible: false,
      code: ``
    }
  ])

  const tableData = [
    {
      name: 'Meleon',
      age: 24,
      gender: 'male'
    },
    {
      name: 'Alice',
      age: 22,
      gender: 'female'
    },
    {
      name: 'Alex',
      age: 23,
      gender: 'male'
    }
  ]

  const genRowStyle = (e: { rowIdx: number }) => {
    return {
      height: '53px',
      backgroundColor:
        e.rowIdx % 2 === 0 ? 'var(--primary-color-6)' : 'var(--success-color-6)'
    }
  }
  const genColumnStyle = (e: { columnIdx: number }) => {
    return {
      width: e.columnIdx === 0 ? '120px' : ''
    }
  }

  const onRowClick = (...args: any[]) => {
    console.log('row clicked', args)
  }
  const onCellClick = (...args: any[]) => {
    console.log('cell clicked', args)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
