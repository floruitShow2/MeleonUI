/**
 * @description 将 格式化字符串 转换为 时间选择器的列
 * @param format
 * @returns
 */
export function convertFormat2Columns(format: string) {
  const units = ['H', 'h', 'm', 's', 'a', 'A']
  const list: string[] = []
  let use12Hours = false

  units.forEach((unit) => {
    if (format.indexOf(unit) !== -1) {
      list.push(unit)

      if (unit === 'a' || unit === 'A') {
        use12Hours = true
      }
    }
  })

  return {
    list,
    use12Hours
  }
}
