import type { App, Plugin } from 'vue'
import MlAvatar from './ml-avatar'
import MlAvatarGroup from './ml-avatar-group'
import MlButton from './ml-button'
import MlCell from './ml-cell'
import MlCellGroup from './ml-cell-group'
import MlCheckbox from './ml-checkbox'
import MlCheckboxGroup from './ml-checkbox-group'
import MlConfigProvider from './ml-config-provider'
import MlCountTo from './ml-count-to'
import MlDrawer from './ml-drawer'
import MlIcon from './ml-icon'
import MlImage from './ml-image'
import MlInput from './ml-input'
import MlInputTag from './ml-input-tag'
import MlMessage from './ml-message'
import MlNavigator from './ml-navigator'
import MlOption from './ml-option'
import MlProgress from './ml-progress'
import MlSelect from './ml-select'
import MlTab from './ml-tab'
import MlTable from './ml-table'
import MlTableColumn from './ml-table-column'
import MlTabs from './ml-tabs'
import MlTag from './ml-tag'
import MlTimeline from './ml-timeline'
import MlTimelineItem from './ml-timeline-item'

const components: Record<string, Plugin> = {
  MlAvatar,
  MlAvatarGroup,
  MlButton,
  MlCell,
  MlCellGroup,
  MlCheckbox,
  MlCheckboxGroup,
  MlConfigProvider,
  MlCountTo,
  MlDrawer,
  MlIcon,
  MlImage,
  MlInput,
  MlInputTag,
  MlMessage,
  MlNavigator,
  MlOption,
  MlProgress,
  MlSelect,
  MlTab,
  MlTable,
  MlTableColumn,
  MlTabs,
  MlTag,
  MlTimeline,
  MlTimelineItem
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
