<template>
  <slot />
</template>

<script setup lang="ts">
  import { toRefs, onMounted, inject } from 'vue'
  import type { PropType } from 'vue'
  import { useCompose } from '@meleon/uni-ui/utils'
  import { ForcedProperty, type ColumnSettingType } from './interface/config'
  import { MlTableInjectionKey } from '../ml-table/context'

  const props = defineProps({
    label: { type: String, default: '' },
    prop: { type: String, default: '' },
    custom: {
      type: Boolean,
      default: false
    },
    type: { type: String as PropType<ColumnSettingType['type']> },
    width: { type: Number, default: 0 },
    minWidth: { type: Number, default: 0 },
    fixed: {
      type: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
      default: false
    }
  })
  const { label, prop, type, width, minWidth, custom, fixed } = toRefs(props)

  // 获取 ml-table 组件注入的变量
  const globalContext = inject(MlTableInjectionKey)

  const getColumnIndex = (columnId: string | undefined) => {
    if (columnId === undefined) return -1
    return Number(columnId.slice(columnId.length - 1))
  }
  const mergePropsData = (propsList: ColumnSettingType[]) => {
    return propsList.reduce((accu: ColumnSettingType, next: ColumnSettingType) => {
      return { ...accu, ...next }
    }, {})
  }
  const setColumnForcedProps = (column: ColumnSettingType): ColumnSettingType => {
    // 根据 column 的类型，禁止开发者对部分属性的设置
    const columnType = column.type
    if (columnType) {
      const source = ForcedProperty[columnType]
      type SourceKey = keyof typeof source
      Object.keys(source).forEach((key) => {
        const forcedValue = source[key as SourceKey]
        if (forcedValue !== undefined) {
          column[key as SourceKey] = forcedValue
        }
      })
    }
    return column
  }
  const setColumnWidth = (column: ColumnSettingType): ColumnSettingType => {
    column.minWidth = column.minWidth ?? 80
    return column
  }

  // let columnIdSeed = 1
  onMounted(() => {
    if (!globalContext) {
      throw new Error(
        '未收到 ml-table 注入的上下文，请确定 ml-table-column 组件是否被 ml-table 组件包裹'
      )
    }
    const { storeEntity, getColumnId } = globalContext
    // prepare the classNames of table-columns
    // ml-table 会根据 columnId 对用户设置的列进行排序
    const columnId = getColumnId()
    // 准备好完整的 props 配置项
    const defaults: ColumnSettingType = {
      columnId,
      width: width?.value,
      minWidth: minWidth?.value
    }
    const basicProps = { label: label.value, property: prop.value }
    const customProps = {
      custom: custom.value,
      type: type?.value,
      fixed: (() => {
        if (typeof fixed.value === 'boolean') {
          return fixed.value ? 'right' : undefined
        } else {
          return fixed.value
        }
      })()
    }
    let columnConfig = mergePropsData([defaults, basicProps, customProps])
    // 通过 compose 函数链式调用多个函数，并将处理结果赋值给 columnConfig
    const chainsFunc = useCompose(setColumnWidth, setColumnForcedProps)
    columnConfig = chainsFunc(columnConfig)
    const columnIndex: number = getColumnIndex(columnConfig.columnId)
    if (storeEntity) storeEntity.commit('insertColumns', columnConfig, columnIndex)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
