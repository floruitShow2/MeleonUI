export interface TimeListItem {
  id: string
  value: number | string
  label: string
  disabled?: boolean
  selected?: boolean
}
export type TimeList = TimeListItem[]

export interface TimePickerProps {
  modelValue: MeleonDatetime.DateValue
  step?: Partial<{ hour: number; minute: number; second: number }>
}
