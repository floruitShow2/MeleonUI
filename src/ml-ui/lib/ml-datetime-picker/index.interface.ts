import type { Dayjs } from 'dayjs'

// header
export type HeaderLabelClickFunc = (label: 'year' | 'month') => void

export interface DatetimePickerProps {
  mode: MeleonDatetime.DateMode

  modelValue: MeleonDatetime.DateValue

  defaultModelValue: MeleonDatetime.DateValue

  format: string

  onChange?: (value: Dayjs) => void
}
