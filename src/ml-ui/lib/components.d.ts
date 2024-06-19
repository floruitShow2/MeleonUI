import type { ButtonInstance } from './ml-button'
import type { ConfigProviderInstance } from './ml-config-provider'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MlButton: ButtonInstance
    MlConfigProvider: ConfigProviderInstance
  }
}

export {}
