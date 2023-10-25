interface PropertyType {
  index: {
    sortable: boolean
  }
}
export const ForcedProperty: PropertyType = {
  index: {
    sortable: false
  }
}
// table column interface
interface ForcedColumnSettingType {
  columnId: string
  property: string
  label: string
  type: 'index'
  custom: boolean
  nodeType: string
  width: number
  minWidth: number
  sortable: boolean
  fixed: boolean | string
  children: ForcedColumnSettingType[]
}
export type ColumnSettingType = Partial<ForcedColumnSettingType>

// store interface
export interface MutationsType {
  [key: string]: (...args: any[]) => void
}
// store funcList 用户自定义功能函数
export interface FuncListType {
  cellStyle: (...args: unknown[]) => void
  rowStyle: (...args: unknown[]) => void
  columnStyle: (...args: unknown[]) => void
  headerRowStyle: (...args: unknown[]) => void
  tagType: (...args: unknown[]) => void
}
// 网格样式类型
export interface TableCellType {
  style: {
    [key: string]: string
  }
  tagStyle: string
}
export type TableMeshStyle = TableCellType[][]
