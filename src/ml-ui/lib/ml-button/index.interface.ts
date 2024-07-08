export interface ButtonProps {
  shape: 'square' | 'round' | 'circle'
  size: Meleon.MlSize
  type: 'primary' | 'secondary' | 'outline' | 'text'
  status: 'normal' | 'success' | 'warning' | 'danger'
  loading: boolean
}
