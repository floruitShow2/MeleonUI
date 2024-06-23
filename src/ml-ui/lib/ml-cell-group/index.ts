import type { App } from 'vue'
import _CellGroup from './index.vue'

const install = (app: App) => {
    app.component('MlCellGroup', _CellGroup)
}

export type CellGroupInstance = typeof import('./index.vue').default
export type { CellGroupProps } from './index.interface'

export default { install }
