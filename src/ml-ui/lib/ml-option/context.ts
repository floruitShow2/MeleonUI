import type { InjectionKey } from 'vue'
import type { MlOptionProps } from './type'

export interface MlSelectGroupContext {
  getSelectedList: () => MlOptionProps[]
  getHiddenList: () => Array<MlOptionProps['value']>
  getTriggerRect: () => Record<string, number>
  addOption: (option: MlOptionProps) => void
  selectOption: (option: MlOptionProps) => void
}

const MlSelectGroupInjectionKey: InjectionKey<MlSelectGroupContext> = Symbol('MlSelect')

export { MlSelectGroupInjectionKey }
