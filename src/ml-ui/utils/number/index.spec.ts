import { expect, test } from 'vitest'
import { getDecimalPlaces } from './index'

test('获取小数点后的位数', () => {
  expect(getDecimalPlaces(1.1)).toBe(1)
})
