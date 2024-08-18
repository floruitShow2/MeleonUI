import type { App } from 'vue'
import _TimePicker from './index.vue'

const install = (app: App) => {
  app.component('MlTimePicker', _TimePicker)
}

export type TimePickerInstance = typeof import('./index.vue').default
export { TimeColumnEnum } from './index.interface'
export type { TimePickerProps, TimeList } from './index.interface'

export default { install }
