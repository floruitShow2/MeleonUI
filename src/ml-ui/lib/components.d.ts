import type {
  AvatarInstance,
  AvatarGroupInstance,
  ButtonInstance,
  CheckboxInstance,
  CheckboxGroupInstance,
  ConfigProviderInstance,
  CountToInstance,
  DrawerInstance,
  IconInstance,
  InputInstance,
  InputTagInstance,
  MessageInstance,
  NavigatorInstance,
  OptionInstance,
  ProgressInstance,
  SelectInstance,
  TabInstance,
  TabsInstance,
  TableInstance,
  TableColumnInstance,
  TagInstance,
  TimelineInstance,
  TimelineItemInstance,
  CellInstance
} from './index'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MlAvatar: AvatarInstance
    MlAvatarGroup: AvatarGroupInstance
    MlButton: ButtonInstance
    MlCell: CellInstance
    MlCheckbox: CheckboxInstance
    MlCheckboxGroup: CheckboxGroupInstance
    MlConfigProvider: ConfigProviderInstance
    MlCountTo: CountToInstance
    MlDrawer: DrawerInstance
    MlIcon: IconInstance
    MlInput: InputInstance
    MlInputTag: InputTagInstance
    MlMessage: MessageInstance
    MlNavigator: NavigatorInstance
    MlOption: OptionInstance
    MlProgress: ProgressInstance
    MlSelect: SelectInstance
    MlTab: TabInstance
    MlTable: TableInstance
    MlTableColumn: TableColumnInstance
    MlTabs: TabsInstance
    MlTag: TagInstance
    MlTimeline: TimelineInstance
    MlTimelineItem: TimelineItemInstance
  }
}

export {}
