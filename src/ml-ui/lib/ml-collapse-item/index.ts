import type { App } from 'vue'
import _CollapseItem from './index.vue'

const install = (app: App) => {
  app.component('MlCollapseItem', _CollapseItem)
}

export type CollapseItemInstance = typeof import('./index.vue').default
export type { CollapseItemProps } from './index.interface'

export default { install }
