import type { App } from 'vue'
import _TimelineItem from './index.vue'

const install = (app: App) => {
  app.component('MlTimelineItem', _TimelineItem)
}

export type TimelineItemInstance = typeof import('./index.vue').default
export type { TimelineItemProps } from './index.interface'

export default { install }
