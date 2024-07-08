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

export interface MessageEvents {
  primary: (options: MessageOptions) => void
  info: (options: MessageOptions) => void
  success: (options: MessageOptions) => void
  warning: (options: MessageOptions) => void
  danger: (options: MessageOptions) => void
}
