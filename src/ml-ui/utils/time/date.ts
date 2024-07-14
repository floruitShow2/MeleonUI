import dayjs from 'dayjs'
import type { Dayjs, ManipulateType } from 'dayjs'
import { isString } from '../is'

export function getNow() {
  return dayjs()
}

export function formatDateValue(val: MeleonDatetime.DateValue | undefined, format: string) {
  if (!val) return

  if (isString(val)) {
    if (dayjs(val, format).isValid()) return dayjs(val, format)
  }

  return dayjs(val, format)
}

export const methods = {
  add(time: Dayjs, value: number, unit: ManipulateType) {
    return time.add(value, unit)
  },
  subtract(time: Dayjs, value: number, unit: ManipulateType) {
    return time.subtract(value, unit)
  }
}
