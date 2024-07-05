import type { App } from 'vue'
import _Switch from './index.vue'

const install = (app: App) => {
    app.component('MlSwitch', _Switch)
}

export type SwitchInstance = typeof import('./index.vue').default
export type { SwitchProps } from './index.interface'

export default { install }
