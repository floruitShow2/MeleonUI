<template>
  <view class="table-view">
    <MlNavigator
      title="MlButton"
      has-back
      icon-color="#FFFFFF"
      title-color="#FFFFFF"
      background-color="#7A98B3"
    />
    <view class="table-view-wrapper" :style="wrapperStyle">
      <!-- 基础用法 -->
      <CodeBlock :code="templateMap[0].templateCode">
        <template #title>
          <text>基础用法</text>
        </template>
        <template #description>
          <text> 基础用法，支持数据渲染、表格布局及节点自定义等功能 </text>
        </template>
        <template #demo>
          <view class="table-container">
            <MlTable
              :data="tableData"
              size="mini"
              stripe
              border
              :height="200"
              :loading="false"
              :refresher-enabled="true"
              :refresher-interval="2000"
              :row-style="genRowStyle"
              :column-style="genColumnStyle"
              @row-click="onRowClick"
              @cell-click="onCellClick"
            >
              <template #cell="{ column, row }">
                <block v-if="column.property === 'gender'">
                  <MlTag :model-value="row[column.property]" type="primary" size="mini"></MlTag>
                </block>
                <block v-else-if="column.property === 'age'">
                  <MlCountTo
                    :to="row[column.property]"
                    animation
                    :value-style="{ fontSize: '14px', color: 'var(--info-color-8)' }"
                  ></MlCountTo>
                </block>
                <text v-else>{{ column.property && row[column.property] }}</text>
              </template>
              <MlTableColumn type="index" fixed="left"></MlTableColumn>
              <MlTableColumn prop="name" label="姓名" fixed></MlTableColumn>
              <MlTableColumn prop="age" label="年龄"></MlTableColumn>
              <MlTableColumn prop="gender" label="性别"></MlTableColumn>
            </MlTable>
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
  import MlTableColumn from '@/ml-ui/lib/ml-table-column/index.vue'
  import MlTable from '@/ml-ui/lib/ml-table/index.vue'
  import MlTag from '@/ml-ui/lib/ml-tag/index.vue'
  import MlCountTo from '@/ml-ui/lib/ml-count-to/index.vue'
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
      modelVisible: false,
      templateCode: ``
    },
    {
      modelVisible: false,
      templateCode: ``
    },
    {
      modelVisible: false,
      templateCode: ``
    },
    {
      modelVisible: false,
      templateCode: ``
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
      backgroundColor: e.rowIdx % 2 === 0 ? 'var(--primary-color-6)' : 'var(--success-color-6)'
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
