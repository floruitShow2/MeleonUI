import type { App } from 'vue'
import _Avatar from './index.vue'
import type { AvatarProps } from './index.interface'

const install = (app: App) => {
  app.component('MlAvatar', _Avatar)
}

export type AvatarInstance = typeof import('./index.vue').default

export type { AvatarProps }
export default { install }
