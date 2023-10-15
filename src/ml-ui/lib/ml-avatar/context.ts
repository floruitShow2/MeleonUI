import type { InjectionKey } from 'vue'
import type { BaseAvatarProps } from './type'
export interface AvatarGroupContext {
  total: number
  offset: number
  maxCount: number
  globalSize: number
  globalShape: BaseAvatarProps['shape']
  getAvatarId: () => number
}

const avatarGroupInjectionKey: InjectionKey<AvatarGroupContext> = Symbol('ml-avatar-group')

export { avatarGroupInjectionKey }
