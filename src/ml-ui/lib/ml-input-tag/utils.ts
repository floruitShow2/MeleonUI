import { isNumber, isObject } from '../../utils/is'
import type { TagData } from './index.interface'

export const getValueData = (
  value: Array<string | number | TagData>
): TagData[] => {
  const result: TagData[] = []
  for (const item of value) {
    if (isObject(item)) {
      result.push(item)
    } else if (item || isNumber(item)) {
      const raw = {
        value: item,
        label: String(item),
        closable: true
      }
      result.push({
        ...raw
      })
    }
  }
  return result
}
