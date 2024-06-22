import type { App } from 'vue'
import _Message from './index.vue'

const install = (app: App) => {
  app.component('MlMessage', _Message)
}

export type MessageInstance = typeof import('./index.vue').default
export type { MessageProps, MessageOptions } from './index.interface'

export { default as MlMessage } from './MlMessage'

export default { install }
