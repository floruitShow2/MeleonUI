<template>
  <view :class="className" :style="themeColors">
    <!-- 表格主题加载动画 -->
    <view v-if="useGet<boolean>(globalConstants, 'store.states.loading')" class="loading-overlay">
      <view class="loader" />
    </view>
    <view class="hidden-columns"><slot /></view>
    <view class="table-header">
      <scroll-view
        :scroll-x="true"
        :scroll-left="scrollLeftOffset"
        :enable-flex="true"
        class="ml-table-header"
        @scroll="onTableBodyScroll"
      >
        <view class="ml-table-header__wrapper" :style="{ ...fixedPaddingOffset }">
          <view
            v-for="(nfColumn, nfIdx) in storeEntityStates.notFixedColumns"
            :key="nfColumn.columnId"
            :class="[
              'ml-table-header__column',
              `ml-table-header__column--${useGet(storeEntityStates, 'size', 'small')}`,
              nfColumn.columnId
            ]"
            :style="{
              width: `${nfColumn.width}px`,
              borderRight:
                storeEntityStates.border &&
                (useGet(storeEntityStates, 'notFixedColumns.length', 0) as number) !== nfIdx + 1
                  ? 'solid 1px var(--info-color-6)'
                  : '',
              ...(
                useGet(storeEntityStates, 'columnStyle', () => {}) as TableEntityType['columnStyle']
              )({ columnIdx: nfIdx, column: nfColumn })
            }"
          >
            <text v-if="nfColumn.label">{{ nfColumn.label }}</text>
            <text v-else-if="nfColumn.type === 'index'">序号</text>
          </view>
        </view>
      </scroll-view>
      <!-- 左侧固定列 -->
      <view class="ml-table-header-left-fixed__wrapper">
        <view
          v-for="(fColumn, nfIdx) in storeEntityStates.fixedColumns?.filter(
            (column) => column.fixed === 'left'
          )"
          :key="fColumn.columnId"
          :class="[
            'ml-table-header__column',
            `ml-table-header__column--${useGet(storeEntityStates, 'size', 'small')}`,
            fColumn.columnId
          ]"
          :style="{
            width: `${fColumn.width}px`,
            borderRight:
              storeEntityStates.border &&
              (useGet(storeEntityStates, 'notFixedColumns.length', 0) as number) !== nfIdx + 1
                ? 'solid 1px var(--info-color-6)'
                : ''
          }"
        >
          <text v-if="fColumn.label">{{ fColumn.label }}</text>
          <text v-else-if="fColumn.type === 'index'">序号</text>
        </view>
      </view>
      <!-- 右侧固定列 -->
      <view class="ml-table-header-right-fixed__wrapper">
        <view
          v-for="(fColumn, nfIdx) in storeEntityStates.fixedColumns?.filter(
            (column) => column.fixed === 'right'
          )"
          :key="fColumn.columnId"
          :class="[
            'ml-table-header__column',
            `ml-table-header__column--${useGet(storeEntityStates, 'size', 'small')}`,
            fColumn.columnId
          ]"
          :style="{
            width: `${fColumn.width}px`,
            borderRight:
              storeEntityStates.border &&
              (useGet(storeEntityStates, 'notFixedColumns.length', 0) as number) !== nfIdx + 1
                ? 'solid 1px var(--info-color-6)'
                : ''
          }"
        >
          <text v-if="fColumn.label">{{ fColumn.label }}</text>
          <text v-else-if="fColumn.type === 'index'">序号</text>
        </view>
      </view>
    </view>
    <view class="table-body">
      <!-- 空状态 -->
      <view
        v-if="useGet(globalConstants, 'store.states.data.length') === 0"
        class="empty-status"
        :style="{
          height: useGet(globalConstants, 'store.states.height')
            ? `${useGet(globalConstants, 'store.states.height', 0)}px`
            : ''
        }"
      >
        <slot name="empty">
          <text>暂无数据</text>
        </slot>
      </view>
      <!-- 常规列 -->
      <scroll-view
        v-else
        :enable-flex="true"
        :refresher-enabled="useGet(storeEntityStates, 'refresherEnabled', false)"
        :refresher-triggered="refresherTrigger"
        refresher-default-style="none"
        :scroll-y="true"
        :scroll-x="true"
        :scroll-left="scrollLeftOffset"
        class="ml-table-body"
        :style="{
          height: `${useGet(globalConstants, 'store.states.height')}px`
        }"
        bindrefresherrefresh="onRefreshing"
        bindrefresherrestore="onRefresherRestore"
        @scroll="onTableBodyScroll"
        @refresherrefresh="onTableBodyRefresh"
      >
        <!-- 下拉刷新加载动画 -->
        <template #refresher>
          <view class="refresher-wrapper">
            <view class="loader" />
            <view class="text">Loading...</view>
          </view>
        </template>
        <view class="ml-table-body__wrapper" :style="{ ...fixedPaddingOffset }">
          <view
            v-for="(row, index) in storeEntityStates.data"
            :key="index"
            :class="tableRowCls"
            :style="{
              backgroundColor:
                useGet(storeEntityStates, 'stripe', false) && index % 2 !== 0 ? '#F7F7F7' : '',
              ...(useGet(storeEntityStates, 'rowStyle', () => {}) as TableEntityType['rowStyle'])({
                rowIdx: index,
                row
              })
            }"
            @click="($event) => onRowClick(row, index, $event)"
          >
            <view class="table-columns not-fixed-columns">
              <view
                v-for="(column, columnIdx) in storeEntityStates.notFixedColumns"
                :key="column.columnId"
                :class="['custom-table__column', column.columnId]"
                :style="{
                  width: `${column.width}px`,
                  borderLeft:
                    storeEntityStates.border && columnIdx !== 0
                      ? 'solid 1px var(--info-color-6)'
                      : '',
                  // ...getCellStyle(index, columnIdx),
                  ...(
                    useGet(
                      storeEntityStates,
                      'columnStyle',
                      () => {}
                    ) as TableEntityType['columnStyle']
                  )({ columnIdx, column }),
                  ...(
                    useGet(storeEntityStates, 'cellStyle', () => {}) as TableEntityType['cellStyle']
                  )({ rowIdx: index, row, columnIdx, column })
                }"
                @click="($event) => onCellClick(row, index, column, columnIdx, $event)"
              >
                <text v-if="column.type === 'index'">{{ index + 1 }}</text>
                <slot
                  name="cell"
                  :column="column"
                  :row="row"
                  :row-index="index"
                  :column-index="columnIdx"
                >
                  <text>{{ column.property && row[column.property] }}</text>
                </slot>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
      <!-- 左侧固定列 -->
      <view class="ml-table-body-left-fixed__wrapper">
        <view
          v-for="(row, index) in storeEntityStates.data"
          :key="index"
          :class="tableRowCls"
          :style="{
            backgroundColor:
              useGet(storeEntityStates, 'stripe', false) && index % 2 !== 0 ? '#F7F7F7' : '#FFFFFF',
            ...(useGet(storeEntityStates, 'rowStyle', () => {}) as TableEntityType['rowStyle'])({
              rowIdx: index,
              row
            })
          }"
        >
          <view class="table-columns">
            <view
              v-for="(column, columnIdx) in storeEntityStates.fixedColumns?.filter(
                (column) => column.fixed === 'left'
              )"
              :key="column.columnId"
              :class="['custom-table__column', 'fixed-table__column', column.columnId]"
              :style="{
                width: `${column.width}px`,
                borderLeft:
                  storeEntityStates.border && columnIdx !== 0 ? 'solid 1px var(--info-color-6)' : ''
              }"
            >
              <text v-if="column.type === 'index'">{{ index + 1 }}</text>
              <slot
                name="fixedCell"
                :column="column"
                :row="row"
                :row-index="index"
                :column-index="columnIdx"
              >
                <text>{{ column.property && row[column.property] }}</text>
              </slot>
            </view>
          </view>
        </view>
      </view>
      <!-- 右侧固定列 -->
      <view class="ml-table-body-right-fixed__wrapper">
        <view
          v-for="(row, index) in storeEntityStates.data"
          :key="index"
          :class="tableRowCls"
          :style="{
            backgroundColor:
              useGet(storeEntityStates, 'stripe', false) && index % 2 !== 0 ? '#F7F7F7' : '#FFFFFF',
            ...(useGet(storeEntityStates, 'rowStyle', () => {}) as TableEntityType['rowStyle'])({
              rowIdx: index,
              row
            })
          }"
        >
          <view class="table-columns">
            <view
              v-for="(column, columnIdx) in storeEntityStates.fixedColumns?.filter(
                (column) => column.fixed === 'right'
              )"
              :key="column.columnId"
              :class="['custom-table__column', 'fixed-table__column', column.columnId]"
              :style="{
                width: `${column.width}px`,
                borderLeft:
                  storeEntityStates.border && columnIdx !== 0 ? 'solid 1px var(--info-color-6)' : ''
              }"
            >
              <text v-if="column.type === 'index'">{{ index + 1 }}</text>
              <slot
                name="fixedCell"
                :column="column"
                :row="row"
                :row-index="index"
                :column-index="columnIdx"
              >
                <text>{{ column.property && row[column.property] }}</text>
              </slot>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="table-footer"></view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, provide, getCurrentInstance, reactive, toRefs, watch } from 'vue'
  import type { PropType, ComponentInternalInstance } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import {
    cs,
    getRect,
    generateDeviceUI,
    useGet,
    useDebounce,
    useDeepClone
  } from '@meleon/uni-ui/utils'
  import { MlTableInjectionKey } from './context'
  import type StateWatcher from '../ml-table-column/store'
  import { createStore } from '../ml-table-column/store/helper'
  // 为 table 组件创建【观察者】角色，并将其添加到【发布方】的观察者列表中
  import {
    Observer,
    type ColumnSettingType,
    type TableEntityType,
    type WatcherStatesType
  } from '../ml-table-column/interface'

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
    size: {
      type: String as PropType<MlDesign.Size>,
      default: 'small'
    },
    height: { type: Number },
    refresherEnabled: { type: Boolean, default: false },
    refresherInterval: {
      type: Number,
      default: 1000
    },
    rowStyle: {
      type: Function as PropType<TableEntityType['rowStyle']>
    },
    columnStyle: {
      type: Function as PropType<TableEntityType['columnStyle']>
    },
    cellStyle: {
      type: Function as PropType<TableEntityType['cellStyle']>
    }
  })
  const { size, border } = toRefs(props)

  const emit = defineEmits(['rowClick', 'cellClick'])

  const { themeColors } = useTheme()

  const prefix = 'ml-table'
  const className = computed(() => {
    return cs(prefix, [`${prefix}-${size.value}`], {
      [`${prefix}-border`]: border.value
    })
  })

  // 创建 ml-table 标识符
  let tableIdSeed = 1
  let columnIdSeed = 1
  const tableId = 'ml-table__' + tableIdSeed++

  const getColumnId = () => {
    return tableId + '_column_' + columnIdSeed++
  }

  const instance = getCurrentInstance()

  // 初始化 store 实例和 state 实例
  const storeEntity = createStore(instance, {})
  const tableObserver = new Observer(tableId)
  storeEntity.addObserver(tableObserver)
  const globalConstants = reactive<{
    store: StateWatcher
    table: ComponentInternalInstance | null
  }>({
    store: storeEntity,
    table: instance
  })
  const storeEntityStates = ref<WatcherStatesType>({})

  // 提交 setData，更新 storeEntity 状态
  const setStoreData = (payload: Record<string, any>) => {
    const { store } = globalConstants
    if (store && payload) {
      ;(store as StateWatcher).commit('setData', payload)
    }
  }

  const rowRender = () => {
    const query = uni.createSelectorQuery().in(instance)
    query.select('.table-body').boundingClientRect()
    query.exec((res) => {
      if (res[0] === null) return
      // 基于父容器宽度计算列宽
      computeColumnWidth(res[0].width)
    })
  }

  watch(
    () => props,
    (newVal) => {
      setStoreData({ ...useDeepClone(newVal), tableId })
    },
    { immediate: true, deep: true }
  )

  // 重写 update 函数，监听发布方事件广播行为
  const newUpdate = () => {
    const { store } = globalConstants
    if (!store) return
    globalConstants.store = store.getStore()
    storeEntityStates.value = globalConstants.store.states
    rowRender()
  }
  tableObserver.update = useDebounce(newUpdate, { delay: 1000 })

  provide(MlTableInjectionKey, {
    tableId,
    storeEntity: globalConstants.store,
    table: globalConstants.table,
    getColumnId
  })

  const rowPrefix = 'ml-table-body'
  const tableRowCls = computed(() => {
    return cs(
      `${rowPrefix}__wrapper-row`,
      `${rowPrefix}__wrapper-row--${useGet(storeEntityStates.value, 'size', 'small')}`
    )
  })

  const { screenWidth } = generateDeviceUI().ui

  const computeColumnWidth = async (remainWidth: number) => {
    // if (!globalCtx) return
    if (remainWidth === 0) {
      const { width } = await getRect(instance, '.ml-table')
      remainWidth = width ?? screenWidth
    }
    const { notFixedColumns } = storeEntityStates.value
    if (!notFixedColumns) return
    let notSetWidthNum = 0
    const widthList = notFixedColumns.map((item: ColumnSettingType) => {
      let columnWidth: number = item.width === undefined ? 0 : item.width
      if (columnWidth === 0) notSetWidthNum++
      else remainWidth -= columnWidth
      return columnWidth
    })
    if (notSetWidthNum !== 0) {
      const final_width = remainWidth / notSetWidthNum
      widthList.forEach((item: number, index: number) => {
        let width = item
        if (width === 0) width = final_width
        notFixedColumns[index].width = width
      })
    }
  }

  const fixedPaddingOffset = computed(() => {
    let paddingLeft: number = 0
    let paddingRight: number = 0
    useGet<ColumnSettingType[]>(storeEntityStates.value, 'fixedColumns', []).forEach((column) => {
      if (column.fixed === 'left') paddingLeft += column.width ?? 0
      else if (column.fixed === 'right') paddingRight += column.width ?? 0
    })
    return {
      paddingLeft: `${paddingLeft}px`,
      paddingRight: `${paddingRight}px`
    }
  })

  const scrollLeftOffset = ref<number>(0)
  const onTableBodyScroll = (e: { detail: { scrollLeft: number } }) => {
    scrollLeftOffset.value = e.detail.scrollLeft
  }

  const refresherTrigger = ref<boolean>(false)
  const onTableBodyRefresh = () => {
    refresherTrigger.value = true
    const refreshInterval = useGet<number>(storeEntityStates.value, 'refresherInterval', 500)
    setTimeout(() => {
      refresherTrigger.value = false
    }, refreshInterval)
  }

  // 事件机制
  const onRowClick = (row: any, rowIndex: number, e: MouseEvent) => {
    e.preventDefault()
    emit('rowClick', { row, rowIndex, $event: e })
  }
  const onCellClick = (
    row: any,
    rowIndex: number,
    column: ColumnSettingType,
    columnIndex: number,
    e: MouseEvent
  ) => {
    e.preventDefault()
    emit('cellClick', { row, rowIndex, column, columnIndex, $event: e })
  }
</script>

<style lang="less">
  @import './index.less';
</style>
