import type { App } from 'vue'
import _IconSwitcher from './index.vue'

const install = (app: App) => {
  app.component('MlCheckbox', _IconSwitcher)
}

export type IconSwitcherInstance = typeof import('./index.vue').default
export type { IconSwitcherProps } from './index.interface'

export default { install }
