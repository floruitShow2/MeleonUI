import type { UploaderProps } from './index.interface'

interface ChooseImageInput {
  multiple: boolean
  limit: number
  sourceType: UploaderProps['sourceType']
}

async function chooseImage(
  chooseImageInput?: Partial<ChooseImageInput>
): Promise<UniApp.ChooseImageSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    const { multiple, limit, sourceType } = chooseImageInput || {}
    uni.chooseImage({
      count: multiple ? limit ?? 9 : 1,
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
  fieldName: string
  header: Record<string, string>
  formData: Record<string, any>
}
function uploadFile(
  uploadFileInput: UploadFileInput
): Promise<UniApp.UploadFileSuccessCallbackResult> {
  return new Promise((resolve, reject) => {
    const { url, path, fieldName, header, formData } = uploadFileInput
    uni.uploadFile({
      url,
      header,
      formData,
      name: fieldName,
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
