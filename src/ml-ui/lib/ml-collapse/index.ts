import type { App } from 'vue'
import _Collapse from './index.vue'

const install = (app: App) => {
  app.component('MlCollapse', _Collapse)
}

export type CollapseInstance = typeof import('./index.vue').default
export type { CollapseProps } from './index.interface'

export default { install }
