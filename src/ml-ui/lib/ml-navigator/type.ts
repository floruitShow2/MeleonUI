export interface ToolType {
  icon: string
  color: string
  type: 'return' | 'navigator'
  delta?: number
  path?: string
}
