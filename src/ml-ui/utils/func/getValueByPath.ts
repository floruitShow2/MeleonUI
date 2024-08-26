import { isArray, isObject } from '../is'

export const getValueByPath = <T = any>(
  obj?: Record<string, any>,
  path?: string
): T | undefined => {
  if (!obj || !path) return undefined

  path = path.replace(/\[(\w+)\]/g, '.$1')
  const keys = path.split('.')

  if (keys.length === 0) return undefined

  let temp = obj
  for (let i = 0; i < keys.length; i++) {
    if ((!isObject(temp) && !isArray(temp)) || !keys[i]) return undefined

    if (i !== keys.length - 1) {
      temp = temp[keys[i]]
    } else {
      return temp[keys[i]]
    }
  }

  return undefined
}
