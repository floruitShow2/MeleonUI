import type { InjectionKey } from 'vue'

export interface CheckboxGroupContext {
  getCheckedList: () => Array<string | number>
  getDisabledList: () => Array<string | number>
  getMin: () => number
  getMax: () => number
  initTotalList: (value: string | number) => void
  updateCheckedList: (value: string | number) => void
}
const checkboxGroupInjectionKey: InjectionKey<CheckboxGroupContext> =
  Symbol('ml-checkbox-group')

export { checkboxGroupInjectionKey }
