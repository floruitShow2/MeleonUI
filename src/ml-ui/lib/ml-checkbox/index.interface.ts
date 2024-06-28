export interface CheckboxProps {
  checked: boolean
  indeterminate: boolean
  disabled: boolean
  size: Omit<MlDesign.Size, 'large'>
  value: string | number
}
