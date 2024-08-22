/**
 * @description 获取页面元素的尺寸信息
 * @param context 使用 getCurrentInstance 获取到的 “this”
 * @param selector 目标元素的 CSS 选择器
 * @returns 与 getBoundingClientRect 返回值相同
 */
export function getRect(
  context: any,
  selector: string
): Promise<Record<string, number>> {
  return new Promise(function (resolve) {
    uni
      .createSelectorQuery()
      .in(context)
      .select(selector)
      .boundingClientRect()
      .exec(function (rect) {
        if (rect === void 0) {
          rect = []
        }
        return resolve(rect[0])
      })
  })
}
export function getAllRect(
  context: any,
  selector: string
): Promise<Record<string, number>[]> {
  return new Promise(function (resolve) {
    uni
      .createSelectorQuery()
      .in(context)
      .selectAll(selector)
      .boundingClientRect()
      .exec(function (rect) {
        if (rect === void 0) {
          rect = []
        }
        return resolve(rect[0])
      })
  })
}
