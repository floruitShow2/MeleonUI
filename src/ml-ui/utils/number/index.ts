export function getDecimalPlaces(num: number) {
  const str = num.toString()
  const decimalPlace = str.indexOf('.')
  if (decimalPlace === -1) return 0
  return str.length - decimalPlace - 1
}

/**
 * @param v 需要转换为数字的字符串
 * @param limit 当转换后的数字并不是合法数字时，返回 无限大 或 无限小
 * @returns 数字
 */
export function convertToNumber(v: string | number, limit: 'upper' | 'lower') {
  const num = +v
  if (isNaN(num)) return limit === 'lower' ? -Infinity : Infinity
  else return num
}
