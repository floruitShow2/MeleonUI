import type { Dayjs } from 'dayjs'

// header
export type HeaderLabelClickFunc = (label: 'year' | 'month') => void

export interface DatetimePickerProps {
  locale: Record<string, any>

  mode: MeleonDatetime.DateMode

  modelValue: MeleonDatetime.DateValue

  defaultModelValue: MeleonDatetime.DateValue

  format: string

  isSameTime: IsSameTimeFunc
  disabledDate: DisabledDateFunc

  onChange?: (value: Dayjs) => void
}

export type WeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface DatetimePickerCell {
  label: string
  value: Dayjs
  isPrev?: boolean
  isNext?: boolean
}

export type IsSameTimeFunc = (current: Dayjs, dayjs: Dayjs) => boolean
export type DisabledDateFunc = (current: Date) => boolean
