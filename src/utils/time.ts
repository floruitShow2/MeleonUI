import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD '

export function formatToDateTime(
  date: dayjs.ConfigType = undefined,
  format = DATE_TIME_FORMAT
): string {
  return dayjs(date).format(format)
}

export function formatToDate(date: dayjs.ConfigType = undefined, format = DATE_FORMAT): string {
  return dayjs(date).format(format)
}

export const dateUtil = dayjs

export function formatTimeAgo(time: Date | string | number) {
  const timestamp = new Date(time).getTime()
  const current = new Date().getTime()
  const delta = current - timestamp
  if (delta < 0) return '时间在当前时间以后'
  const seconds = delta / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24
  const weeks = days / 7
  const months = days / 30
  if (months > 1) {
    return `${Math.floor(months)}月前`
  }
  if (weeks > 1) {
    return `${Math.floor(weeks)}周前`
  }
  if (days > 1) {
    return `${Math.floor(days)}天前`
  }
  if (hours > 1) {
    return `${Math.floor(hours)}小时前`
  }
  if (minutes > 1) {
    return `${Math.floor(minutes)}分钟前`
  }
  return '刚刚'
}
