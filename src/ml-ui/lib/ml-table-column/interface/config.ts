interface PropertyType {
  index: {
    sortable: boolean
  }
  select: Record<string, any>
}
export const ForcedProperty: PropertyType = {
  index: {
    sortable: false
  },
  select: {}
}
// table column interface
export interface ForcedColumnSettingType {
  columnId: string
  property: string
  label: string
  type?: 'index' | 'select'
  custom: boolean
  width: number
  minWidth: number
  sortable: boolean
  fixed: boolean | 'left' | 'right'
  children: ForcedColumnSettingType[]
}
export type ColumnSettingType = Partial<ForcedColumnSettingType>

// store interface
export interface MutationsType {
  [key: string]: (...args: any[]) => void
}
// store funcList 用户自定义功能函数
// export interface FuncListType {
//   cellStyle: (...args: unknown[]) => void
//   rowStyle: (...args: unknown[]) => void
//   columnStyle: (...args: unknown[]) => void
//   headerRowStyle: (...args: unknown[]) => void
//   tagType: (...args: unknown[]) => void
// }
// 网格样式类型
export interface TableCellType {
  style: {
    [key: string]: string
  }
  tagStyle: string
}
export type TableMeshStyle = TableCellType[][]
