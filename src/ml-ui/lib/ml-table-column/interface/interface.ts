import type { ColumnSettingType } from './config'

interface StatesType {
  data: any[]
  // 表格列原始数据
  _columns: ColumnSettingType[]
  // 提取 fixed 列并排序后的数据
  fixedColumns: ColumnSettingType[]
  notFixedColumns: ColumnSettingType[]
  originColumns: ColumnSettingType[]
  // 铺平后的列数据
  leafColumns: ColumnSettingType[]
  fixedLeafColumns: ColumnSettingType[]
  columns: ColumnSettingType[]
  leafColumnsLength: number
  fixedLeafColumnLength: number
}

interface TableEntityType {
  data: Record<string, any>
  border: boolean
  stripe: boolean
  loading: boolean
  height: number
  size: MlDesign.Size
  refresherEnabled: boolean
  refresherInterval: number
}
// export type ComponentInstance = WechatMiniprogram.Component.Instance<
//   Record<string, any>,
//   Record<string, any>,
//   Record<string, any>,
//   Record<string, any>,
//   false
// >
export type WatcherStatesType = Partial<StatesType & TableEntityType>
export type TableDataType<T> = Array<T>

// 观察者模式的观察者，为 table 组件创建观察者角色
export class Observer {
  name: string
  constructor(name: string) {
    this.name = name
  }
  update() {}
}
