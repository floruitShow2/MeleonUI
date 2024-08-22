import type { App } from 'vue'
import _Message from './index.vue'
import type { MessageEvents } from './index.interface'

const install = (app: App) => {
  app.component('MlMessage', _Message)
}

export type MessageInstance = typeof import('./index.vue').default &
  MessageEvents
export type { MessageProps, MessageOptions } from './index.interface'

export { default as MlMessage } from './MlMessage'

export default { install }
