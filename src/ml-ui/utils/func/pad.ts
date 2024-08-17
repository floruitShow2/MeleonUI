/**
 * @description 字符串补全
 * @param value 初始值
 * @param length 返回值长度
 * @param char 用来补位的字符
 * @returns
 */
export function padStart(value: string | number, length: number, char: string = ' '): string {
  const str = String(value)
  if (!str) return str

  const newStr = str.length < length ? `${char}${str}` : str
  return newStr.length < length ? padStart(newStr, length, char) : newStr
}

export function padEnd(value: string | number, length: number, char: string = ' '): string {
  const str = String(value)
  if (!str) return str

  const newStr = str.length < length ? `${str}${char}` : str
  return newStr.length < length ? padStart(newStr, length, char) : newStr
}
