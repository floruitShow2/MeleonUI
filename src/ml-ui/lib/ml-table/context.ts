import type { InjectionKey, ComponentInternalInstance } from 'vue'
import type StateWatcher from '../ml-table-column/store'

export interface TableContext {
  tableId: string
  storeEntity: StateWatcher
  table: ComponentInternalInstance | null
  getColumnId: () => string
}

const MlTableInjectionKey: InjectionKey<TableContext> = Symbol('ml-table')

export { MlTableInjectionKey }
