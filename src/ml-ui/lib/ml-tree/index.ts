import type { App } from 'vue'
import _Tree from './index.vue'

const install = (app: App) => {
  app.component('MlTree', _Tree)
}

export type TreeInstance = typeof import('./index.vue').default
export type { TreeProps, TreeDataEntity } from './index.interface'

export default { install }
