export enum ImageModeEnum {
  // 不保持纵横比缩放图片，使图片完全适应【图片可能会变形】
  SCALE_TO_FILL = 'scaleToFill',
  // 保持纵横比缩放图片，使图片的长边能完全显示出来
  ASPECT_FIT = 'aspectFit',
  // 保持纵横比缩放图片，只保证图片的短边能完全显示出来
  ASPECT_FILL = 'aspectFill',
  // 宽度不变，高度自动变化，保持原图宽高比不变
  WIDTH_FIX = 'widthFix',
  // 高度不变，宽度自动变化，保持原图宽高比不变
  HEIGHT_FIX = 'heightFix'
}

export interface ImageProps {
  /**
   * @description 图片地址
   */
  src: string
  /**
   * @description 图片模式
   */
  mode: ImageModeEnum
  /**
   * @description 图片宽度
   */
  width: number
  /**
   * @description 图片高度
   */
  height: number
}
