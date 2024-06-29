import type { App } from 'vue'
import _Tree from './index.vue'
import type { TreeEvents } from './index.interface'

const install = (app: App) => {
  app.component('MlTree', _Tree)
}

export type {
  TreeProps,
  TreeDataEntity,
  TreeNodeEntity,
  TreeCheckPayload,
  TreeExpandPayload,
  TreeSelectPayload,
  TreeEvents
} from './index.interface'
export type TreeInstance = typeof import('./index.vue').default & TreeEvents

export default { install }
