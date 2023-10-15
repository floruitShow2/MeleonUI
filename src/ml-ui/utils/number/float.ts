export function getDecimalPlaces(num: number) {
  const str = num.toString()
  const decimalPlace = str.indexOf('.')
  if (decimalPlace === -1) return 0
  return str.length - decimalPlace - 1
}
