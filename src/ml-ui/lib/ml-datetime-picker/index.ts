import type { App } from 'vue'
import _DatetimePicker from './index.vue'

const install = (app: App) => {
  app.component('MlDatetimePicker', _DatetimePicker)
}

export type DatetimePickerInstance = typeof import('./index.vue').default
export type { DatetimePickerProps } from './index.interface'

export default { install }
