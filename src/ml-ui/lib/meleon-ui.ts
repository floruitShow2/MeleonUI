import type { App, Plugin } from 'vue'
import MlAvatar from './ml-avatar'
import MlButton from './ml-button'
import MlIcon from './ml-icon'

const components: Record<string, Plugin> = {
  MlAvatar,
  MlButton,
  MlIcon
}
const install = (app: App) => {
  for (const key in components) {
    if (Object.prototype.hasOwnProperty.call(components, key)) {
      app.use(components[key])
    }
  }
}

const MeleonUI = {
  install
}

export default MeleonUI
