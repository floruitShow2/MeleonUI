import type { App } from 'vue'
import _Option from './index.vue'

const install = (app: App) => {
    app.component('MlOption', _Option)
}

export type OptionInstance = typeof import('./index.vue').default
export type { OptionProps } from './index.interface'

export default { install }
