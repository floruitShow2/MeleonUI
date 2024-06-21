import type { App } from 'vue'
import _Tabs from './index.vue'

const install = (app: App) => {
    app.component('MlTabs', _Tabs)
}

export type TabsInstance = typeof import('./index.vue').default

export default { install }
