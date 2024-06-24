import type { App } from 'vue'
import _Image from './index.vue'

const install = (app: App) => {
  app.component('MlCheckbox', _Image)
}

export type ImageInstance = typeof import('./index.vue').default
export type { ImageProps } from './index.interface'

export { ImageModeEnum } from './index.interface'
export default { install }
