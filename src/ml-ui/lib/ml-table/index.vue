<template>
  <view :class="className" :style="themeColors">
    <!-- 表格主题加载动画 -->
    <view v-if="useGet(globalConstants, 'store.states.loading')" class="loading-overlay">
      <view class="loader" />
    </view>
    <view class="hidden-columns"><slot /></view>
    <view class="table-header">
      <MlTableHeader />
    </view>
    <view class="table-body">
      <view
        v-if="useGet(globalConstants, 'store.states.data.length') === 0"
        class="empty-status"
        :style="{
          height: `${useGet(globalConstants, 'store.states.height')}px`
        }"
      >
        <slot name="empty">
          <text>暂无数据</text>
        </slot>
      </view>
      <!-- <MlTableBody v-slot="slotScope">
        <slot name="body" :scope="slotScope" />
      </MlTableBody> -->
      <scroll-view
        v-else
        :enable-flex="true"
        :refresher-enabled="storeEntityStates.refresherEnabled"
        refresher-triggered="{{trigger}}"
        refresher-default-style="none"
        :scroll-y="true"
        :scroll-x="true"
        class="ml-table-body"
        :style="{ ...heightStyle, ...themeColors }"
        bindrefresherrefresh="onRefreshing"
        bindrefresherrestore="onRefresherRestore"
      >
        <!-- 下拉刷新加载动画 -->
        <template #refresher>
          <view class="refresher-wrapper">
            <view class="loader" />
            <view class="text">Loading...</view>
          </view>
        </template>
        <view class="ml-table-body__wrapper">
          <view
            v-for="(row, index) in storeEntityStates.data"
            :key="index"
            :class="tableRowCls"
            :style="generateRowStyle(storeEntityStates.stripe || false, index)"
            catchtap="rowTap"
            catchlongpress="rowLongPress"
          >
            <view class="table-columns fixed-columns"></view>
            <view class="table-columns not-fixed-columns">
              <view
                v-for="(column, columnIdx) in storeEntityStates.notFixedColumns"
                :key="column.columnId"
                :class="['custom-table__column', column.columnId]"
                :style="{
                  width: `${column.width}px`,
                  borderLeft:
                    storeEntityStates.border && columnIdx === 0
                      ? 'solid 1px var(--info-color-6)'
                      : '',
                  borderRight: storeEntityStates.border ? 'solid 1px var(--info-color-6)' : '',
                  ...getCellStyle(index, columnIdx)
                }"
              >
                <slot
                  name="cell"
                  :column="column"
                  :row="row"
                  :row-index="index"
                  :column-index="columnIdx"
                >
                  <text>{{ column.property && row[column.property] }}</text>
                </slot>

                <!-- <view
                v-if="!column.custom || column.nodeType.length === 0 }}"
                class="column-text"
                ></view
              >
              <template
                is="{{ row_data.settings.control_type ? row_data.settings.control_type : nf_column.nodeType }}"
                wx:else
                data="{{row_data, nf_column, idx, nf_idx, add_to_parent, tableMesh}}"
              /> -->
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="table-footer"></view>
  </view>
</template>

<script setup lang="ts">
  import { ref, computed, provide, getCurrentInstance, reactive, toRefs, watch } from 'vue'
  import type { PropType, ComponentInternalInstance } from 'vue'
  import { MlTableInjectionKey } from './context'
  import MlTableHeader from './ml-table-header/index.vue'
  import useTheme from '../../src/hooks/useTheme'
  import { cs } from '../../utils/property'
  import { generateDeviceUI } from '../../utils/rect'
  import { useDebounce, useDeepClone, useGet } from '../../utils/func'
  import { createStore } from '../ml-table-column/store/helper'
  import type StateWatcher from '../ml-table-column/store'
  // 为 table 组件创建【观察者】角色，并将其添加到【发布方】的观察者列表中
  import {
    Observer,
    type ColumnSettingType,
    type TableMeshStyle,
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
    height: { type: Number, default: 0 },
    refresherEnabled: { type: Boolean, default: false },
    refresherInterval: {
      type: Number,
      default: 1000
    }
  })

  const { size } = toRefs(props)
  const emit = defineEmits([])
  const { themeColors } = useTheme()
  const prefix = 'ml-table'
  const className = computed(() => {
    return cs(prefix, [`${prefix}-${size.value}`])
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

  const computeColumnWidth = (remain_width: number) => {
    // if (!globalCtx) return
    if (remain_width === 0) remain_width = screenWidth
    const { notFixedColumns } = storeEntityStates.value
    if (!notFixedColumns) return
    let notSetWidthNum = 0
    const widthList = notFixedColumns.map((item: ColumnSettingType) => {
      let column_width: number = item.width === undefined ? 0 : item.width
      if (column_width === 0) notSetWidthNum++
      else remain_width -= column_width
      return column_width
    })
    if (notSetWidthNum !== 0) {
      const final_width = remain_width / notSetWidthNum
      widthList.forEach((item: number, index: number) => {
        let width = item
        if (width === 0) width = final_width
        notFixedColumns[index].width = width
      })
    }
  }

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
  const generateRowStyle = (stripe: boolean, index: number) => {
    let rowStyle = ''
    if (stripe) {
      rowStyle += index % 2 !== 0 ? 'background-color: #F7F7F7;' : ''
    }
    return rowStyle
  }

  // 计算 ml-table-body 的高度
  const heightStyle = ref({ height: '' })
  const generateHeight = (store: StateWatcher) => {
    const height = store.states.height
    heightStyle.value.height = height && height !== 0 ? `height: ${height}px;` : ''
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
    generateHeight(globalConstants.store)
    rowRender(globalConstants.store)
  }
  tableObserver.update = useDebounce(newUpdate, { delay: 1000 })

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
