<template>
  <view class="uni_class">
    <ml-navigator title="ml-list" has-back background="#7A98B3" />
    <view class="view-wrapper" :style="wrapperStyle">
      <ml-message ref="messageRef"></ml-message>
      <code-block class="view-wrapper-block" :code="tmps[0].code">
        <template #title>{{ tmps[0].title }}</template>
        <template #description>{{ tmps[0].description }}</template>
        <template #demo>
          <ml-list
            ref="listRef"
            v-model:error="error"
            :data="mockData"
            :loading="loading"
            :loading-text="'自定义的加载中文本...'"
            :finished="finished"
            :height="400"
            style="width: 100%"
            @load="handleLoad"
          >
            <template #item="{ item }">
              <ml-cell
                :label="item.label"
                :description="item.description"
                :value="item.value"
                allow-edit
              ></ml-cell>
            </template>
          </ml-list>
        </template>
      </code-block>

      <code-block class="view-wrapper-block" :code="tmps[1].code">
        <template #title>{{ tmps[1].title }}</template>
        <template #description>{{ tmps[1].description }}</template>
        <template #demo>
          <ml-list :data="mockVirtualData" :height="400" virtual-list style="width: 100%">
            <template #virtual="{ data }">
              <ml-cell
                v-for="item in data"
                :key="item.id"
                :label="item.label"
                :description="item.description"
                :value="item.value"
                allow-edit
                style="width: 100%"
              ></ml-cell>
            </template>
          </ml-list>
        </template>
      </code-block>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useAppStore } from '@/store'
  import CodeBlock from '@/components/CodeBlock/index.vue'
  import type { ListInstance, MessageInstance } from '@/ml-ui'

  const appStore = useAppStore()
  const wrapperStyle = computed(() => {
    const { screenWidth, contentHeight, tabbarHeight, bottomBarHeight } = appStore.appSize
    return {
      width: `${screenWidth}px`,
      height: `${contentHeight + tabbarHeight + bottomBarHeight}px`
    }
  })

  const mockData = ref(
    new Array(20).fill(0).map((_, index) => {
      return {
        id: `id-${index}`,
        label: `标题${index}`,
        description: `描述${index}`,
        value: `值${index}`
      }
    })
  )

  const mockVirtualData = ref(
    new Array(100).fill(0).map((_, index) => {
      return {
        id: `id-${index}`,
        label: `标题${index}`,
        description: `描述${index}`,
        value: `值${index}`
      }
    })
  )

  const listRef = ref<ListInstance>()
  const messageRef = ref<MessageInstance>()
  const finished = ref(false)
  const loading = ref(false)
  const error = ref(true)
  const handleLoad = () => {
    if (!messageRef.value) return
    if (mockData.value.length >= 60) {
      finished.value = true
    }

    if (finished.value) {
      messageRef.value.success({
        content: '所有数据加载完成',
        duration: 2000
      })
    } else {
      messageRef.value.primary({
        content: '触发 load 事件',
        duration: 2000
      })

      mockData.value = [
        ...mockData.value,
        ...new Array(20).fill(0).map((_, index) => {
          const idx = mockData.value.length + index
          return {
            id: `id-${idx}`,
            label: `标题${idx}`,
            description: `描述${idx}`,
            value: `值${idx}`
          }
        })
      ]
    }
  }

  onMounted(() => {
    if (listRef.value) listRef.value.scrollIntoView('id-10')
  })

  const tmps = [
    {
      title: '基础使用',
      description: '列表的基础使用。支持调用 scrollIntoView 滚动到指定 id 位置',
      code: `
<ml-list
  ref="listRef"
  v-model:error="error"
  :data="mockData"
  :loading="loading"
  :loading-text="'自定义的加载中文本...'"
  :finished="finished"
  :height="400"
  style="width: 100%"
  @load="handleLoad"
>
  <template #item="{ item }">
    <ml-cell
      :label="item.label"
      :description="item.description"
      :value="item.value"
      allow-edit
    ></ml-cell>
  </template>
</ml-list>

`
    },
    {
      title: '虚拟列表',
      description: '虚拟列表的基础使用',
      code: `
<ml-list :data="mockVirtualData" :height="400" virtual-list style="width: 100%">
  <template #virtual="{ data }">
    <ml-cell
      v-for="item in data"
      :key="item.id"
      :label="item.label"
      :description="item.description"
      :value="item.value"
      allow-edit
    ></ml-cell>
  </template>
</ml-list>

`
    }
  ]
</script>

<style lang="less">
  @import './index.less';
</style>
