import type { App } from 'vue'
import _List from './index.vue'
import type { ListEvents } from './index.interface'

const install = (app: App) => {
  app.component('MlList', _List)
}

export type { ListProps } from './index.interface'
export type ListInstance = typeof import('./index.vue').default & ListEvents

export default { install }
