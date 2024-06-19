import type { App } from 'vue'
import _ConfigProvider from './index.vue'

const install = async (app: App) => {
  app.component('MlConfigProvider')
}

export type ConfigProviderInstance = typeof import('./index.vue').default

export type { ConfigProviderProps } from './index.interface'
export default { install }
