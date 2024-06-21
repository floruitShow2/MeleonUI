import type { App } from 'vue'
import _Input from './index.vue'

const install = (app: App) => {
    app.component('MlInput', _Input)
}

export type InputInstance = typeof import('./index.vue').default

export default { install }
