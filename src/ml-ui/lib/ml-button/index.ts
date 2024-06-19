import type { App } from 'vue'
import _Button from './index.vue'
import type { ButtonProps } from './index.interface'

const install = async (app: App) => {
  app.component('MlButton', _Button)
}

export type ButtonInstance = typeof import('./index.vue').default

export type { ButtonProps }
export default { install }
