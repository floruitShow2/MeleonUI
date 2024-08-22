import type { InjectionKey } from 'vue'
import type { OptionProps } from '../ml-option'

export interface MlSelectGroupContext {
  getSelectedList: () => OptionProps[]
  getHiddenList: () => Array<OptionProps['value']>
  getTriggerRect: () => Record<string, number>
  addOption: (option: OptionProps) => void
  selectOption: (option: OptionProps) => void
}

const MlSelectGroupInjectionKey: InjectionKey<MlSelectGroupContext> =
  Symbol('MlSelect')

export { MlSelectGroupInjectionKey }
