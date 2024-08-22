import Store from './index'
import type { WatcherStatesType } from '../interface/interface'

type StatesKey = keyof WatcherStatesType
type valueOf<T> = T[keyof T]
type StatesValue = valueOf<WatcherStatesType>

export const createStore = (table: any, initialStates: WatcherStatesType) => {
  const store = new Store()
  if (!table) return store
  if (!initialStates) initialStates = {}
  // 当前表格实例
  store.$table = table
  // 将初始值绑定到 store 的 state 上
  Object.keys(initialStates).forEach((key) => {
    ;(store.states[key as StatesKey] as StatesValue) =
      initialStates[key as StatesKey]
  })
  return store
}
