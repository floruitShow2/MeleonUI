import type { App } from 'vue'
import _TableColumn from './index.vue'

const install = (app: App) => {
    app.component('MlTableColumn', _TableColumn)
}

export type TableColumnInstance = typeof import('./index.vue').default
export * from './interface'

export default { install }
