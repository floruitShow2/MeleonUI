import type { InjectionKey, Ref } from 'vue'
import type { TimelineProps } from './index.interface'

export interface TimelineContext {
  mode: Ref<TimelineProps['mode']>
  total: Ref<number>
  reverse: Ref<boolean>
  direction: Ref<TimelineProps['direction']>
  getTimelineItemIndex: () => number
  getTimeLineRect: () => Promise<Record<string, number>>
}

const timelineInjectionKey: InjectionKey<TimelineContext> =
  Symbol('ml-timeline')

export { timelineInjectionKey }
