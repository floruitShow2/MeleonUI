export interface BaseMlMessageProps {
  duration: number
}

export interface MlMessageOptions {
  id?: string | number
  type?: 'primary' | 'info' | 'success' | 'danger' | 'warning'
  content: string
  closable?: boolean
  duration?: number
  position?: 'top' | 'bottom'
}
