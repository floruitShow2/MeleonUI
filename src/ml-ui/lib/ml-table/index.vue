<template>
  <view :class="className" :style="themeColors">
    <!-- 表格主题加载动画 -->
    <view v-if="globalConstants.store.states.loading" class="loading-overlay">
      <view class="loader" />
    </view>
    <view class="hidden-columns"><slot></slot></view>
    <view class="table-header">
      <MlTableHeader />
    </view>
    <view class="table-body">
      <view
        wx:if="{{layout.store.states.data.length === 0}}"
        class="empty-status"
        style="height: {{layout.store.states.height}}px;"
      >
        <text wx:if="{{!layout.store.states.custom_empty}}">暂无数据</text>
        <view wx:else>
          <slot name="empty"></slot>
        </view>
      </view>
      <MlTableBody />
    </view>
    <view class="table-footer"></view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, provide, getCurrentInstance, onMounted, reactive } from 'vue'
  import type { PropType, ComponentInternalInstance } from 'vue'
  import { MlTableInjectionKey } from './context'
  import MlTableHeader from './ml-table-header/index.vue'
  import MlTableBody from './ml-table-body/index.vue'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'
  import { useDebounce, useDeepClone } from '../../utils/func'
  import { createStore } from '../ml-table-column/store/helper'
  import type StateWatcher from '../ml-table-column/store'
  // 为 table 组件创建【观察者】角色，并将其添加到【发布方】的观察者列表中
  import { Observer } from '../ml-table-column/interface'

  const props = defineProps({
    data: { type: Array, default: () => [] },
    border: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    height: { type: Number, default: 0 },
    customEmpty: { type: Boolean, default: false },
    refresherEnabled: { type: Boolean, default: false },
    refresherInterval: {
      type: Number,
      default: 1000
    }
    // funcList: {
    //   type: Object
    // }
  })

  const emit = defineEmits([])
  const { themeColors } = useTheme()
  const prefix = 'ml-table'
  const className = computed(() => {
    return cs(prefix)
  })

  let tableIdSeed = 1
  let columnIdSeed = 1
  const tableId = 'ml-table__' + tableIdSeed++
  const tableObserver = new Observer('table')

  const instance = getCurrentInstance()
  const storeEntity = createStore(instance, {})
  storeEntity.addObserver(tableObserver)
  const globalConstants = reactive<{
    store: StateWatcher
    table: ComponentInternalInstance | null
  }>({
    store: storeEntity,
    table: instance
  })

  // 提交 setData，更新 storeEntity 状态
  const setStoreData = (payload: Record<string, any>) => {
    const { store } = globalConstants
    if (store && payload) {
      ;(store as StateWatcher).commit('setData', payload)
    }
  }

  setStoreData({ ...useDeepClone(props), tableId })
  // 重写 update 函数，监听发布方事件广播行为
  const newUpdate = () => {
    const { store } = globalConstants
    if (!store) return
    globalConstants.store = store.getStore()
  }
  tableObserver.update = useDebounce(newUpdate, { delay: 1000 })

  const getColumnId = () => {
    return tableId + '_column_' + columnIdSeed++
  }
  provide(MlTableInjectionKey, {
    tableId,
    storeEntity: globalConstants.store,
    table: globalConstants.table,
    getColumnId
  })
</script>

<style lang="less">
  @import './index.less';
</style>
