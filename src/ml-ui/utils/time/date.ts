import dayjs from 'dayjs'
import type { Dayjs, ManipulateType, OpUnitType } from 'dayjs'
import { isArray, isString } from '../is'

export function getNow() {
  return dayjs()
}

/**
 * @description 将用户传入的 Date 转换为 Dayjs
 * @param val Date
 * @param format string
 * @returns
 */
export function formatDateValue(val: MeleonDatetime.DateValue | undefined, format: string) {
  if (!val) return

  if (isString(val)) {
    if (dayjs(val, format).isValid()) return dayjs(val, format)
  }

  return dayjs(val, format)
}

/**
 * @description 获取日期数据
 * @param value
 */
export function getDateValue(value: Dayjs): Date
export function getDateValue(value: Dayjs | Dayjs[] | (Dayjs | undefined)[] | undefined) {
  const formatValue = (t: Dayjs | undefined) => (t ? t.toDate() : undefined)

  if (isArray(value)) {
    return value.map(formatValue)
  }

  return formatValue(value)
}

export const methods = {
  add(time: Dayjs, value: number, unit: ManipulateType) {
    return time.add(value, unit)
  },
  startOf(time: Dayjs, unit: OpUnitType) {
    return time.startOf(unit)
  },
  subtract(time: Dayjs, value: number, unit: ManipulateType) {
    return time.subtract(value, unit)
  }
}

/**
 * @description 返回给使用者的日期数据
 * @param date
 * @param format
 * @returns
 */
export function getReturnValue(date: Dayjs, format?: MeleonDatetime.DateFormat) {
  if (format === 'timestamp') {
    return date.toDate().getTime()
  }
  if (format === 'Date') {
    return date.toDate()
  }
  return date.format(format)
}
