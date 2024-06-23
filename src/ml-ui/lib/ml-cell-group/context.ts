import type { InjectionKey, Ref } from 'vue'

export interface CellGroupContext {
    total: Ref<number>
    getCellGroupItemIndex: () => number
}

const cellGroupInjectionKey: InjectionKey<CellGroupContext> = Symbol('ml-cell-group')

export { cellGroupInjectionKey }