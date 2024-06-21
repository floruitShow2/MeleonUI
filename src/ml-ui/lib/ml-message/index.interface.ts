export interface MessageProps {
  duration: number
}

export interface MessageOptions {
  id?: string | number
  type?: 'primary' | 'info' | 'success' | 'danger' | 'warning'
  content: string
  closable?: boolean
  duration?: number
  position?: 'top' | 'bottom'
}
