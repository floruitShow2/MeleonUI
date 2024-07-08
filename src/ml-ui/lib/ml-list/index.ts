import type { App } from 'vue'
import _List from './index.vue'

const install = (app: App) => {
  app.component('MlList', _List)
}

export type ListInstance = typeof import('./index.vue').default
export type { ListProps } from './index.interface'

export default { install }
