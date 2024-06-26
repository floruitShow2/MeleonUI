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
  /**
   * @description 是否自动上传
   */
  autoUpload: boolean
  /**
   * @description 上传文件字段名
   */
  fieldName: string
  /**
   * @description 上传请求头
   */
  headers: Record<string, string>
  /**
   * @description 文件上传额外携带的数据
   */
  data: Record<string, any>
  /**
   * @description 文件列表
   */
  fileList: FileItem[]
  /**
   * @description 是否支持多选图片
   * @description 最多一次性上传9张图片
   */
  multiple: boolean
  /**
   * @description 限制上传数量
   */
  limit: number
  /**
   * @description 预览及上传区域的尺寸
   */
  previewSize: number
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
   * @description 文件列表变化触发回调
   */
  onChange: (files: FileItem[]) => void
  /**
   * @description 删除文件之前的钩子函数
   */
  beforeDelete: (file: FileItem) => boolean | Promise<boolean>
}
