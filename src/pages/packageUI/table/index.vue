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
          <text> 基础用法，绑定 visible 属性控制 drawer 的显示/隐藏 </text>
        </template>
        <template #demo>
          <view class="button-container">
            <MlTable :data="tableData">
              <MlTableColumn prop="name" label="姓名"></MlTableColumn>
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
  import MlButton from '@/ml-ui/lib/ml-button/index.vue'
  import MlTableColumn from '@/ml-ui/lib/ml-table-column/index.vue'
  import MlTable from '@/ml-ui/lib/ml-table/index.vue'
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
</script>

<style lang="less">
  @import './index.less';
</style>
