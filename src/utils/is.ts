export function isArray(val: unknown): val is any[] {
  return Object.prototype.toString.call(val) === '[object Array]'
}
export function isObject(val: unknown): val is Record<string, any> {
  return Object.prototype.toString.call(val) === '[object Object]'
}
export function isString(val: unknown): val is string {
  return Object.prototype.toString.call(val) === '[object String]'
}
