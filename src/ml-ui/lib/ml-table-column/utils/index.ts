export const parseWidth = (width: string) => {
  let realWidth: number
  if (width !== undefined) {
    realWidth = isNaN(parseInt(width, 10)) ? 0 : parseInt(width, 10)
    return realWidth
  }
  return width
}
