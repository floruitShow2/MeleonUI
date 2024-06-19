import type { App } from 'vue'
import _Avatar from './index.vue'
import type { AvatarProps } from './type'

const install = (app: App) => {
  console.log('ml-avatar', _Avatar, app)
  app.component('MlAvatar', _Avatar)
}

export type AvatarInstance = InstanceType<typeof _Avatar>

export type { AvatarProps }
export default { install }
