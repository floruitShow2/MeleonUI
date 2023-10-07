export function getRect(context: any, selector: string): Promise<Record<string, number>> {
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
export function getAllRect(context: any, selector: string): Promise<Record<string, number>[]> {
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
