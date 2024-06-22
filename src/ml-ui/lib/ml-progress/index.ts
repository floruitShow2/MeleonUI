import type { App } from 'vue'
import _Progress from './index.vue'

const install = (app: App) => {
  app.component('MlProgress', _Progress)
}

export type ProgressInstance = typeof import('./index.vue').default
export type { ProgressProps } from './index.interface'

export default { install }
