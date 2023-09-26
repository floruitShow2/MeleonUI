import type { InjectionKey } from 'vue'
import type { MlOptionProps } from './type'

export interface MlSelectGroupContext {
  addOption: (id: string | number, option: MlOptionProps) => void
}

const MlSelectGroupInjectionKey: InjectionKey<MlSelectGroupContext> = Symbol('MlSelect')

export { MlSelectGroupInjectionKey }
