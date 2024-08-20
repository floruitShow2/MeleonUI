import type { App } from 'vue'
import _Transition from './index.vue'

const install = (app: App) => {
  app.component('MlTransition', _Transition)
}

export type TransitionInstance = typeof import('./index.vue').default
export type { TransitionProps } from './index.interface'

export default { install }
