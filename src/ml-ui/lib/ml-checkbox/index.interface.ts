export interface CheckboxProps {
  checked: boolean
  indeterminate: boolean
  disabled: boolean
  size: Omit<Meleon.MlSize, 'large'>
  value: string | number
}
