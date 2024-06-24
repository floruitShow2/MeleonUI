export enum UploaderSourceTypeEnum {
  ALBUM = 'album',
  CAMERA = 'camera'
}

export interface FileItem {
  path: string
  id: string | number
  deletable: boolean
}

export interface UploaderProps {
  /**
   * @description 上传地址
   */
  action: string | (() => string)
  headers: Record<string, string>
  fileList: FileItem[]
  /**
   * @description 是否支持多选图片
   * @description 最多一次性上传9张图片
   */
  multiple: boolean
  /**
   * @description 是否禁用文件上传
   */
  disabled: boolean
  /**
   * @description 从本地选择图片的形式【相机 或 相册】
   */
  sourceType: UploaderSourceTypeEnum
  /**
   * @description 是否显示文件列表
   */
  showFileList: boolean
  /**
   * @description 上传文件之前的钩子函数
   */
  beforeUpload: (files: FileItem[]) => boolean | Promise<boolean>
  /**
   * @description 删除文件之前的钩子函数
   */
  beforeDelete: (file: FileItem) => boolean | Promise<boolean>
}
