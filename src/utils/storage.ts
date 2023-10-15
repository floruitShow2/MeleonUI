export const setStorage = (key: string, data: unknown) => {
  return new Promise((resolve, reject) => {
    uni.setStorage({
      key,
      data: JSON.stringify(data),
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
export const getStorage = (key: string) => {
  return new Promise((resolve, reject) => {
    uni.getStorage({
      key,
      success(res) {
        resolve(JSON.parse(res.data))
      },
      fail() {
        reject(null)
      }
    })
  })
}
