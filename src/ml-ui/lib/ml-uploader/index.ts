import type { App } from 'vue'
import _Uploader from './index.vue'

const install = (app: App) => {
  app.component('MlCheckbox', _Uploader)
}

export type UploaderInstance = typeof import('./index.vue').default
export type { UploaderProps, FileItem } from './index.interface'

export default { install }
