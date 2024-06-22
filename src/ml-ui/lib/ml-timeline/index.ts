import type { App } from 'vue'
import _Timeline from './index.vue'

const install = (app: App) => {
  app.component('MlTimeline', _Timeline)
}

export type TimelineInstance = typeof import('./index.vue').default
export type { TimelineProps } from './index.interface'

export default { install }
