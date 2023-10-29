export const dataTypeLabels: {
  [K in TypeUtil.DataTypeStringKey]: TypeUtil.DataTypeString<K>
} = {
  string: '[object String]',
  number: '[object Number]',
  boolean: '[object Boolean]',
  null: '[object Null]',
  undefined: '[object Undefined]',
  symbol: '[object Symbol]',
  bigInt: '[object BigInt]',
  object: '[object Object]',
  function: '[object Function]',
  array: '[object Array]',
  date: '[object Date]',
  regExp: '[object RegExp]',
  promise: '[object Promise]',
  set: '[object Set]',
  map: '[object Map]',
  file: '[object File]'
}

function getDataTypeString<K extends TypeUtil.DataTypeStringKey>(value: unknown) {
  return Object.prototype.toString.call(value) as TypeUtil.DataTypeString<K>
}

export function isArray(val: unknown): val is any[] {
  return getDataTypeString(val) === dataTypeLabels.array
}
export function isObject(val: unknown): val is Record<string, any> {
  return getDataTypeString(val) === dataTypeLabels.object
}
export function isString(val: unknown): val is string {
  return getDataTypeString(val) === dataTypeLabels.string
}
export function isFile<T extends File>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.file
}
