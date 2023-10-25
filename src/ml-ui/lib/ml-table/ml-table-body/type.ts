// 网格样式类型
export interface TableCellType {
  style: {
    [key: string]: string
  }
  tagStyle: string
}
export type TableMeshStyle = TableCellType[][]
