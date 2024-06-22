import type { App } from 'vue'
import _AvatarGroup from './index.vue'
const install = (app: App) => {
  app.component('MlAvatarGroup', _AvatarGroup)
}

export type AvatarGroupInstance = typeof import('./index.vue').default

export default { install }
