<template>
  <scroll-view
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
    <view v-if="useGet(storeEntityStates, 'data.length', 0) !== 0" class="ml-table-body__wrapper">
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
                storeEntityStates.border && columnIdx === 0 ? 'solid 1px var(--info-color-6)' : '',
              borderRight: storeEntityStates.border ? 'solid 1px var(--info-color-6)' : '',
              ...getCellStyle(index, columnIdx)
            }"
          >
            <slot :column="column" :row="row" :row-index="index" :column-index="columnIdx"></slot>
            <!-- <text>{{ column.property && row[column.property] }}</text> -->
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
  <!-- 指定内容模板样式 -->
  <!-- <template name="input">
      <ws-input
        class="custom-input"
        size="mini"
        border-color="#7a98b3"
        range="{{row_data.settings.range ? row_data.settings.range : []}}"
        input-value="{{row_data[nf_column.property]}}"
        disabled="{{row_data.settings.readonly ? row_data.settings.readonly : false}}"
        is-overlay-show="{{row_data.settings.readonly ? row_data.settings.readonly : false}}"
        func-list="{{row_data.settings.input_func_list}}"
        data-row="{{row_data}}"
        data-rowIdx="{{idx}}"
        data-columnIdx="{{nf_idx}}"
        data-column="{{nf_column}}"
        bind:blur="onInputBlur"
      />
    </template>
    <template name="select">
      <ws-select
        size="mini"
        selected="{{row_data[nf_column.property]}}"
        options="{{row_data.settings[nf_column.property].options}}"
        add-to-parent="{{add_to_parent}}"
        data-row="{{row_data}}"
        data-rowIdx="{{idx}}"
        data-column="{{nf_column}}"
        data-columnIdx="{{nf_idx}}"
        bind:select="onSelectChange"
      />
    </template>
    <template name="tag">
      <ws-tag type="{{row_data.settings[nf_column.property].type || 'primary'}}" size="mini">{{
        row_data[nf_column.property]
      }}</ws-tag>
    </template> -->
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, inject, watch, onMounted } from 'vue'
  import type { PropType, ComponentInternalInstance } from 'vue'
  import useTheme from '../../../src/hooks/useTheme'
  import { cs } from '../../../utils/property'
  import { useGet } from '../../../utils/func'
  import { generateDeviceUI } from '../../../utils/rect'
  import { MlTableInjectionKey } from '../context'
  import type { TableCellType, TableMeshStyle } from './type'
  import type StateWatcher from '../../ml-table-column/store'
  import type { ColumnSettingType, WatcherStatesType } from '../../ml-table-column/interface'

  // const props = defineProps({})
  // const {} = toRefs(props)

  const emit = defineEmits([])
  const { themeColors } = useTheme()
  const prefix = 'ml-table-body'
  const tableRowCls = computed(() => {
    return cs(
      `${prefix}__wrapper-row`,
      `${prefix}__wrapper-row--${useGet(storeEntityStates.value, 'size', 'small')}`
    )
  })

  const globalCtx = inject(MlTableInjectionKey)

  const tableMesh = ref<TableMeshStyle>([])
  const { screenWidth } = generateDeviceUI().ui

  const storeEntityStates = ref<WatcherStatesType>({})
  const updateStates = (store: StateWatcher) => {
    storeEntityStates.value = store.getStates()
  }

  const computeColumnWidth = (remain_width: number) => {
    if (!globalCtx) return
    if (remain_width === 0) remain_width = screenWidth
    const { notFixedColumns } = globalCtx.storeEntity.states
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

  const rowRender = (store: StateWatcher, parent: ComponentInternalInstance) => {
    const query = uni.createSelectorQuery().in(parent)
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

  onMounted(() => {
    if (!globalCtx || !globalCtx.table) return
    updateStates(globalCtx.storeEntity)
    generateHeight(globalCtx.storeEntity)
    rowRender(globalCtx.storeEntity, globalCtx.table)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
