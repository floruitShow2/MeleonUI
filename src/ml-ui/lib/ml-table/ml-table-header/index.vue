<template>
  <view :class="className" :style="themeColors">
    <view class="fixed-headers">
      <view
        v-for="fixedColumn in storeEntityStates.fixedColumns"
        :key="fixedColumn.columnId"
        :class="fixedColumn.columnId"
        >{{ fixedColumn.label }}</view
      >
    </view>
    <view class="not-fixed-headers">
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
          ...getCellStyle(nfIdx),
          ...(useGet(storeEntityStates, 'columnStyle', () => {}) as TableEntityType['columnStyle'])(
            { columnIdx: nfIdx, column: nfColumn }
          )
        }"
      >
        <text v-if="nfColumn.label">{{ nfColumn.label }}</text>
        <text v-else-if="nfColumn.type === 'index'">序号</text>
      </view>
    </view>
    <!-- <view class="right-fixed-columns"></view> -->
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, inject, onMounted } from 'vue'
  import type { PropType, ComponentInternalInstance } from 'vue'
  import { MlTableInjectionKey } from '../context'
  import useTheme from '../../../src/hooks/useTheme'
  import { cs } from '../../../utils/property'
  import { useGet } from '../../../utils/func'
  import { generateDeviceUI } from '../../../utils/rect'
  import type StateWatcher from '../../ml-table-column/store'
  import type {
    ColumnSettingType,
    WatcherStatesType,
    TableEntityType
  } from '../../ml-table-column/interface'
  import type { TableCellType } from '../ml-table-body/type'

  // const props = defineProps({})
  // const {} = toRefs(props)

  const emit = defineEmits([])
  const { themeColors } = useTheme()
  const prefix = 'ml-table-header'
  const className = computed(() => {
    return cs(prefix)
  })
  const { screenWidth } = generateDeviceUI().ui

  const globalCtx = inject(MlTableInjectionKey)

  const storeEntityStates = ref<WatcherStatesType>({})
  const updateStates = (store: StateWatcher) => {
    storeEntityStates.value = store.getStates()
  }

  const headerTableMesh = ref<TableCellType[]>([])
  const generateHeaderMesh = (columnsLength: number) => {
    const lastColumnsLength = headerTableMesh.value.length
    if (lastColumnsLength === columnsLength) return headerTableMesh.value
    return new Array(columnsLength)
      .fill('')
      .map(() => ({ style: {}, tagStyle: '' }) as TableCellType)
  }
  const getCellStyle = (columnIdx: number) => {
    const columns = headerTableMesh.value.length
    if (columnIdx >= columns) return {}
    return headerTableMesh.value[columnIdx].style
  }

  const computeColumnWidth = (remainWidth: number) => {
    if (remainWidth === 0) remainWidth = screenWidth
    const { notFixedColumns } = storeEntityStates.value
    if (!notFixedColumns) return
    let notSetWidthNum = 0
    const widthList = notFixedColumns.map((item: ColumnSettingType) => {
      let column_width: number = item.width === undefined ? 0 : item.width
      if (column_width === 0) notSetWidthNum++
      else remainWidth -= column_width
      return column_width
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
  const rowRender = (store: StateWatcher, parent: ComponentInternalInstance) => {
    const query = uni.createSelectorQuery().in(parent)
    query.select('.table-header').boundingClientRect()
    query.exec((res) => {
      if (res[0] === null) return
      headerTableMesh.value = generateHeaderMesh((store.states.notFixedColumns || []).length)
      computeColumnWidth(res[0].width)
    })
  }
  onMounted(() => {
    if (!globalCtx || !globalCtx.table) return
    updateStates(globalCtx.storeEntity)
    rowRender(globalCtx.storeEntity, globalCtx.table)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
