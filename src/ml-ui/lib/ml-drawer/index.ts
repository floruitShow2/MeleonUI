import type { App } from 'vue'
import _Drawer from './index.vue'

const install = (app: App) => {
    app.component('MlDrawer', _Drawer)
}

export type DrawerInstance = typeof import('./index.vue').default

export type { DrawerProps } from './index.interface'
export default { install }
