import type { Dayjs } from 'dayjs'

export interface DatetimePickerProps {
  mode: 'date' | 'month' | 'week'

  modelValue: MeleonDatetime.DateValue

  defaultModelValue: MeleonDatetime.DateValue

  format: string

  onChange?: (value: Dayjs) => void
}
