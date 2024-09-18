import { h } from 'vue'
import { describe, it, expect } from 'vitest'
import { getDecimalPlaces } from './index'

describe.concurrent('获取小数点后的位数', () => {
  it('获取位数', async ({ expect }) => {
    expect(getDecimalPlaces(1.1)).toBe(1)
  })

  it('未传递正确参数', async ({ expect }) => {
    expect(getDecimalPlaces()).toBe(0)
  })

  it('传递字符串格式参数', async ({ expect }) => {
    expect(getDecimalPlaces('1.12')).toBe(2)
  })
})

it('toUpperCase', () => {
  const result = String('foobar').toUpperCase()
  expect(result).toMatchSnapshot()
})

it('render basic', async () => {
  const result = h('div', { class: 'foo' })
  await expect(result).toMatchFileSnapshot('./test/basic.output.json')
})
