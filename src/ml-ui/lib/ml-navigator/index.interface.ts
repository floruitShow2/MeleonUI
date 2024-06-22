export interface NavigatorToolEntity {
  icon: string
  color: string
  type: 'return' | 'navigator'
  delta?: number
  path?: string
}

export interface NavigatorProps {
  toolBox: NavigatorToolEntity[]
}
