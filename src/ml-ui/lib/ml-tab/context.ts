import type { InjectionKey } from 'vue'
import type { TabData } from './type'

export interface MlTabsGroupContext {
  activeKey: string | number
  scrollWithAnimation: boolean
  selectTabItem: (id: MlTabsGroupContext['activeKey']) => void
  addTabItem: (id: MlTabsGroupContext['activeKey'], tab: TabData) => void
  removeTabItem: (id: MlTabsGroupContext['activeKey']) => void
}

const MlTabsGroupInjectionKey: InjectionKey<MlTabsGroupContext> = Symbol('MlTabs')

export { MlTabsGroupInjectionKey }
