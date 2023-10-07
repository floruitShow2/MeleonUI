import type { InjectionKey } from 'vue'

export interface AvatarGroupContext {
  total: number
}

const avatarGroupInjectionKey: InjectionKey<AvatarGroupContext> = Symbol('WsAvatarGroup')

export { avatarGroupInjectionKey }
