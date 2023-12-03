import type { InjectionKey, Ref } from 'vue'
import type { MlTimelineProps } from './type'

export interface TimelineContext {
  mode: Ref<MlTimelineProps['mode']>
  total: Ref<number>
  reverse: Ref<boolean>
  direction: Ref<MlTimelineProps['direction']>
  getTimelineItemIndex: () => number
  getTimeLineRect: () => Promise<Record<string, number>>
}

const timelineInjectionKey: InjectionKey<TimelineContext> = Symbol('ml-timeline')

export { timelineInjectionKey }
