import type {
  AvatarInstance,
  AvatarGroupInstance,
  ButtonInstance,
  CellInstance,
  CellGroupInstance,
  CheckboxInstance,
  CheckboxGroupInstance,
  CollapseInstance,
  CollapseItemInstance,
  ConfigProviderInstance,
  CountToInstance,
  DatetimePickerInstance,
  DrawerInstance,
  IconInstance,
  ImageInstance,
  InputInstance,
  InputTagInstance,
  ListInstance,
  MessageInstance,
  NavigatorInstance,
  OptionInstance,
  ProgressInstance,
  SelectInstance,
  SwitchInstance,
  TabInstance,
  TabsInstance,
  TableInstance,
  TableColumnInstance,
  TagInstance,
  TimelineInstance,
  TimelineItemInstance,
  TimePickerInstance,
  TransitionInstance,
  TreeInstance,
  UploaderInstance
} from './index'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MlAvatar: AvatarInstance
    MlAvatarGroup: AvatarGroupInstance
    MlButton: ButtonInstance
    MlCell: CellInstance
    MlCellGroup: CellGroupInstance
    MlCheckbox: CheckboxInstance
    MlCheckboxGroup: CheckboxGroupInstance
    MlCollapse: CollapseInstance
    MlCollapseItem: CollapseItemInstance
    MlConfigProvider: ConfigProviderInstance
    MlCountTo: CountToInstance
    MlDatetimePicker: DatetimePickerInstance
    MlDrawer: DrawerInstance
    MlIcon: IconInstance
    MlImage: ImageInstance
    MlInput: InputInstance
    MlInputTag: InputTagInstance
    MlList: ListInstance
    MlMessage: MessageInstance
    MlNavigator: NavigatorInstance
    MlOption: OptionInstance
    MlProgress: ProgressInstance
    MlSelect: SelectInstance
    MlSwitch: SwitchInstance
    MlTab: TabInstance
    MlTable: TableInstance
    MlTableColumn: TableColumnInstance
    MlTabs: TabsInstance
    MlTag: TagInstance
    MlTimeline: TimelineInstance
    MlTimelineItem: TimelineItemInstance
    MlTimePicker: TimePickerInstance
    MlTransition: TransitionInstance
    MlTree: TreeInstance
    MlUploader: UploaderInstance
  }
}

export {}
