export interface ButtonProps {
  shape: 'square' | 'round' | 'circle'
  size: MlDesign.Size
  type: 'primary' | 'secondary' | 'outline' | 'text'
  status: 'normal' | 'success' | 'warning' | 'danger'
  loading: boolean
}
