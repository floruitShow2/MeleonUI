import type { AvatarInstance } from './ml-avatar'
import type { AvatarGroupInstance } from './ml-avatar-group'
import type { ButtonInstance } from './ml-button'
import type { CheckboxInstance } from './ml-checkbox'
import type { CheckboxGroupInstance } from './ml-checkbox-group'
import type { ConfigProviderInstance } from './ml-config-provider'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MlAvatar: AvatarInstance
    MlAvatarGroup: AvatarGroupInstance
    MlButton: ButtonInstance
    MlCheckbox: CheckboxInstance
    MlCheckboxGroup: CheckboxGroupInstance
    MlConfigProvider: ConfigProviderInstance
  }
}

export {}
