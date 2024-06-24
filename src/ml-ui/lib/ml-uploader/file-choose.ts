import type { UploaderProps } from './index.interface'

interface ChooseImageInput {
  multiple: boolean
  sourceType: UploaderProps['sourceType']
}

async function chooseImage(
  chooseImageInput?: Partial<ChooseImageInput>
): Promise<UniApp.ChooseImageSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    const { multiple, sourceType } = chooseImageInput || {}
    uni.chooseImage({
      count: multiple ? 9 : 1,
      sizeType: ['original', 'compressed'],
      sourceType: sourceType ? [sourceType] : ['album', 'camera'],
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

interface UploadFileInput {
  url: string
  path: string
  header: Record<string, string>
  // formData: Record<string, any>
}
function uploadFile(uploadFileInput: UploadFileInput): Promise<UniApp.UploadFileSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    const { url, path, header } = uploadFileInput
    uni.uploadFile({
      url,
      header,
      name: 'file',
      filePath: path,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export type { ChooseImageInput, UploadFileInput }
export { chooseImage, uploadFile }
