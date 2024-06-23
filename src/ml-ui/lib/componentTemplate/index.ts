import type { App } from 'vue'
import _Cell from './index.vue'

const install = (app: App) => {
    app.component('MlCell', _Cell)
}

export type CellInstance = typeof import('./index.vue').default
export type { CellProps } from './index.interface'

export default { install }
