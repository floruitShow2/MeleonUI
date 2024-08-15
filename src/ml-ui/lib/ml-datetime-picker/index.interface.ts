import type { Dayjs } from 'dayjs'

// header
export type HeaderLabelClickFunc = (label: 'year' | 'month') => void
export type IsSameTimeFunc = (current: Dayjs, dayjs: Dayjs) => boolean
export type DisabledDateFunc = (current: Date) => boolean

export interface DatetimePickerProps {
  /**
   * @description 自定义面板中展示的文本
   */
  locale: Record<string, any>

  /**
   * @description 选择器模式
   */
  mode: MeleonDatetime.DateMode

  /**
   * @description 选择的日期时间
   */
  modelValue: MeleonDatetime.DateValue

  /**
   * @description 默认展示的日期时间
   */
  defaultModelValue: MeleonDatetime.DateValue

  /**
   * @description 面板头部展示的时间
   */
  pickerValue: MeleonDatetime.DateValue

  /**
   * @description 面板头部默认展示的时间
   */
  defaultPickerValue: MeleonDatetime.DateValue

  /**
   * @description 时间转换格式
   */
  format: string

  isSameTime: IsSameTimeFunc
  disabledDate: DisabledDateFunc

  /**
   * @description 选中值发生变化时触发
   * @param value
   * @returns
   */
  onChange?: (value: Date) => void
}

export type WeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface DatetimePickerCell {
  label: string
  value: Dayjs
  isPrev?: boolean
  isNext?: boolean
  className?: string
}
