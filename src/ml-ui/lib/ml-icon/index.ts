import type { App } from 'vue'
import _Icon from './index.vue'

const install = (app: App) => {
  console.log('ml-icon', _Icon, app)
  app.component('MlIcon', _Icon)
}

export type IconInstance = InstanceType<typeof _Icon>

export default { install }
