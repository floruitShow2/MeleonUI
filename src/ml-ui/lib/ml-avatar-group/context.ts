import type { InjectionKey } from 'vue'
import type { AvatarProps } from '../ml-avatar/index.interface'
export interface AvatarGroupContext {
  total: number
  offset: number
  maxCount: number
  globalSize: number
  globalShape: AvatarProps['shape']
  getAvatarId: () => number
}

const avatarGroupInjectionKey: InjectionKey<AvatarGroupContext> = Symbol('ml-avatar-group')

export { avatarGroupInjectionKey }
