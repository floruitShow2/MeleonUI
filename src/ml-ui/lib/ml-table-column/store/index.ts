import { Watcher } from './watcher'
import type { MutationsType } from '../interface/config'
import type { WatcherStatesType, Observer } from '../interface/interface'

class StateWatcher extends Watcher {
  mutations: MutationsType
  observerList: Observer[]
  constructor() {
    super()
    const _this = this
    this.observerList = []
    this.mutations = {
      setData: function (states, payload: Record<string, any>) {
        Object.keys(payload).forEach((key) => {
          states[key] = payload[key]
        })
      },
      insertColumns: function (states, column, index) {
        const array = states._columns
        if (array !== undefined) {
          array.splice(index - 1, 0, column)
        } else {
          array.push(column)
        }
        _this.updateColumns()
      },
      getStore() {
        return _this.getStore()
      }
    }
  }
  commit(name: string, ...args: any[]) {
    const mutations = this.mutations
    if (mutations[name]) {
      const mutationParam: [WatcherStatesType, ...any] = [this.states, ...args]
      mutations[name].apply(this, mutationParam)
    } else {
      console.log(`Action ${name} not found...`)
    }
    this.notify()
  }
  getStore() {
    return this
  }
  getStates() {
    return this.states
  }
  // 观察者模式，实现广播事件的发布与监听
  addObserver(...observers: Observer[]) {
    const total_observers = [...this.observerList, ...observers]
    const observers_name: string[] = []
    const res: Observer[] = []
    total_observers.forEach((item) => {
      if (!observers_name.includes(item.name)) {
        observers_name.push(item.name)
        res.push(item)
      }
    })
    this.observerList = [...res]
  }
  notify() {
    this.observerList.forEach((observer) => observer.update())
  }
}
export default StateWatcher
