export interface BaseButtonProps {
  shape: 'square' | 'round' | 'circle'
  size: 'mini' | 'small' | 'medium' | 'large'
  type: 'primary' | 'secondary' | 'outline' | 'text'
  status: 'normal' | 'success' | 'warning' | 'error'
  loading: boolean
}
