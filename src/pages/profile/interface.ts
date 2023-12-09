export interface SettingItemType {
  icon: string
  label: string
  key: string
  path?: string
}

export interface SettingsGroupType {
  title: string
  settings: SettingItemType[]
}
