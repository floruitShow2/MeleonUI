import type { InjectionKey } from 'vue'

export interface CollapseContext {
  activeKeys: Array<string | number>
  total: number
  getIndexState: () => number
  handleClick: (key: string | number, event?: Event) => void
}

const collapseInjectionKey: InjectionKey<CollapseContext> =
  Symbol('ml-collapse')

export { collapseInjectionKey }
