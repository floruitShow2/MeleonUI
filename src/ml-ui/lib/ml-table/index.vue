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
      <scroll-view
        v-else
        :enable-flex="true"
        :refresher-enabled="storeEntityStates.refresherEnabled"
        refresher-triggered="{{trigger}}"
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
            catchtap="rowTap"
            catchlongpress="rowLongPress"
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
                  ...getCellStyle(index, columnIdx),
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
      <view class="ml-table-body-left-fixed__wrapper">
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
      <view class="ml-table-body-right-fixed__wrapper">
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
  import { MlTableInjectionKey } from './context'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'
  import { generateDeviceUI, getRect } from '../../utils/rect'
  import { useDebounce, useDeepClone, useGet } from '../../utils/func'
  import { createStore } from '../ml-table-column/store/helper'
  import type StateWatcher from '../ml-table-column/store'
  // 为 table 组件创建【观察者】角色，并将其添加到【发布方】的观察者列表中
  import {
    Observer,
    type ColumnSettingType,
    type TableMeshStyle,
    type TableEntityType,
    type TableCellType,
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
  const emit = defineEmits([])
  const { themeColors } = useTheme()
  const prefix = 'ml-table'
  const className = computed(() => {
    return cs(prefix, [`${prefix}-${size.value}`], { [`${prefix}-border`]: border.value })
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
  const storeEntityStates = ref<WatcherStatesType>({})

  // 提交 setData，更新 storeEntity 状态
  const setStoreData = (payload: Record<string, any>) => {
    const { store } = globalConstants
    if (store && payload) {
      ;(store as StateWatcher).commit('setData', payload)
    }
  }

  const getColumnId = () => {
    return tableId + '_column_' + columnIdSeed++
  }

  const rowPrefix = 'ml-table-body'
  const tableRowCls = computed(() => {
    return cs(
      `${rowPrefix}__wrapper-row`,
      `${rowPrefix}__wrapper-row--${useGet(storeEntityStates.value, 'size', 'small')}`
    )
  })

  const tableMesh = ref<TableMeshStyle>([])
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

  const generateTableMesh = (rows: number, columns: number) => {
    const lastRows = tableMesh.value.length
    const lastColumns = tableMesh.value[0] ? tableMesh.value[0].length : 0
    if (lastColumns === columns && lastRows === rows) return tableMesh.value
    // 注意，由于每个元素都是引用类型，创建数组时需要避免存储的是同一个元素的地址值
    const mesh: TableMeshStyle = new Array(rows).fill('').map(() => {
      return new Array(columns).fill('').map(() => {
        const column: TableCellType = { style: {}, tagStyle: '' }
        return column
      })
    })
    return mesh
  }
  const getCellStyle = (rowIdx: number, columnIdx: number) => {
    const rows = tableMesh.value.length
    const columns = (tableMesh.value[0] || []).length
    if (rowIdx >= rows || columnIdx >= columns) return {}
    return tableMesh.value[rowIdx][columnIdx].style
  }

  const rowRender = (store: StateWatcher) => {
    const query = uni.createSelectorQuery().in(instance)
    query.select('.table-body').boundingClientRect()
    query.exec((res) => {
      if (res[0] === null) return
      // const { funcList } = store.states
      // 基于父容器宽度计算列宽
      computeColumnWidth(res[0].width)
      // 生成样式矩阵
      const rows = (store.states.data || []).length
      const columns = (store.states.notFixedColumns || []).length
      tableMesh.value = generateTableMesh(rows, columns)
      // 更新 states 以及 mesh 数据
      // this.setData({
      //   states: store.states,
      //   add_to_parent:
      //     store.states.refresher_enabled !== undefined ? store.states.refresher_enabled : false,
      //   refresher_interval:
      //     store.states.refresher_interval !== undefined ? store.states.refresher_interval : false,
      //   tableMesh: mesh
      // })
      // 执行传入的自定义函数
      // if (!funcList) return
      // this.invokeFuncList(funcList)
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
    rowRender(globalConstants.store)
  }
  tableObserver.update = useDebounce(newUpdate, { delay: 1000 })

  const scrollLeftOffset = ref<number>(0)
  // const onTableBodyScroll = useThrottle(
  //   (e: { detail: { scrollLeft: number } }) => {
  //     scrollLeftOffset.value = e.detail.scrollLeft
  //   },
  //   { delay: 1000 / 60 }
  // )
  const onTableBodyScroll = (e: { detail: { scrollLeft: number } }) => {
    scrollLeftOffset.value = e.detail.scrollLeft
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
