import type { App } from 'vue'
import _Tag from './index.vue'

const install = (app: App) => {
    app.component('MlTag', _Tag)
}

export type TagInstance = typeof import('./index.vue').default

export default { install }
