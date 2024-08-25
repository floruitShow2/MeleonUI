import type { App } from 'vue'
import _FormItem from './index.vue'

const install = (app: App) => {
  app.component('MlCell', _FormItem)
}

export type FormItemInstance = typeof import('./index.vue').default
export type { FormItemProps } from './index.interface'

export default { install }
