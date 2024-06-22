import type { App } from 'vue'
import _InputTag from './index.vue'

const install = (app: App) => {
  app.component('MlInputTag', _InputTag)
}

export type InputTagInstance = typeof import('./index.vue').default

export type { InputTagProps } from './index.interface'
export default { install }
