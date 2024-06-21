import type { App } from 'vue'
import _Table from './index.vue'

const install = (app: App) => {
    app.component('MlTable', _Table)
}

export type TableInstance = typeof import('./index.vue').default

export default { install }
