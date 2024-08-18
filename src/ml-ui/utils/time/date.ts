import dayjs from 'dayjs'
import type { Dayjs, ManipulateType, OpUnitType } from 'dayjs'
import { isArray, isString, isUndefined } from '../is'

export function getNow() {
  return dayjs()
}

/**
 * @description 判断时间是否相同
 * @param prevDate
 * @param currentDate
 * @returns
 */
export function isDateValueChange(prevDate: Dayjs | undefined, currentDate: Dayjs | undefined) {
  function isDifference(value1: Dayjs | undefined, value2: Dayjs | undefined) {
    if (value1 === undefined && value2 === undefined) {
      return false
    }

    if ((value1 && !value2) || (!value1 && value2)) {
      return true
    }

    return value1?.valueOf() !== value2?.valueOf()
  }

  if (isUndefined(prevDate) && isUndefined(currentDate)) {
    return false
  }

  if (!isArray(prevDate) && !isArray(currentDate)) {
    return isDifference(prevDate, currentDate)
  }

  return true
}

/**
 * @description 将用户传入的 Date 转换为 Dayjs
 * @param val Date
 * @param format string
 * @returns
 */
export function convertDate2Dayjs(val: MeleonDatetime.DateValue | undefined, format: string) {
  if (!val) return

  if (isString(val)) {
    if (dayjs(val, format).isValid()) return dayjs(val, format)
  }

  return dayjs(val)
}

/**
 * @description 将内部的 Dayjs 转换为返给用户的时间
 * @param time Dayjs
 * @param format 格式
 * @returns
 */
export function convertDayjs2FormatValue(
  time: Dayjs | undefined,
  format: string
): string | undefined {
  if (isUndefined(time)) return undefined

  return time.format(format)
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
