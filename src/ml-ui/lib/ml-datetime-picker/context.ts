import type { InjectionKey } from 'vue'

export interface DatetimePickerContext {
  datePickerT: (key: string) => any
}

export const DatetimePickerContextKey: InjectionKey<DatetimePickerContext> =
  Symbol('ml-datetime-picker')
