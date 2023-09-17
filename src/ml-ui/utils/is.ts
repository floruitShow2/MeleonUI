const _toString = Object.prototype.toString

export function isArray(val: unknown): val is any[] {
  return _toString.call(val) === '[object Array]'
}
export function isObject(val: unknown): val is Record<string, any> {
  return _toString.call(val) === '[object Object]'
}
export function isString(val: unknown): val is string {
  return _toString.call(val) === '[object String]'
}

export function isNotEmptyObject<T>(obj: T): boolean {
  if (obj instanceof Object) {
    return isObject(obj) && Object.keys(obj).length !== 0
  } else return false
}
