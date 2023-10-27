import type { WatcherStatesType, Observer, ColumnSettingType } from '../interface'

const flattenColumns: (columns: ColumnSettingType[]) => ColumnSettingType[] = (columns) => {
  const res: ColumnSettingType[] = []
  columns.forEach((column) => {
    if (column.children) {
      res.push.apply(res, flattenColumns(column.children))
    } else {
      res.push(column)
    }
  })
  return res
}
export class Watcher {
  readonly states: WatcherStatesType
  observerList: Observer[]
  // ml-table 组件的实例
  $table?: any
  constructor() {
    this.states = {
      data: [],
      _columns: [],
      fixedColumns: [],
      fixedColumnsLength: 0,
      notFixedColumns: [],
      notFixedColumnsLength: 0,
      originColumns: [],
      fixedLeafColumns: [],
      fixedLeafColumnLength: 0
    }
    this.observerList = []
  }
  updateColumns() {
    const states = this.states
    const _columns = states._columns || []
    // those columns which do not set the 'fixed' property
    // 未展开的列数据
    states.fixedColumns = _columns
      .filter((column) => column.fixed !== undefined)
      .map((item) => {
        return {
          ...item,
          width: item.width === 0 ? 80 : item.width
        }
      })
    states.fixedColumnsLength = states.fixedColumns.length
    states.notFixedColumns = _columns.filter((column) => !column.fixed)
    states.notFixedColumnsLength = states.notFixedColumns.length
    states.originColumns = [...states.fixedColumns, ...states.notFixedColumns]
    // 展开后的列数据
    states.fixedLeafColumns = flattenColumns(states.fixedColumns)
    states.leafColumns = flattenColumns(states.notFixedColumns)
    states.columns = [...states.fixedLeafColumns, ...states.leafColumns]
    states.leafColumnsLength = states.leafColumns.length
    states.fixedLeafColumnLength = states.fixedLeafColumns.length
  }
}
