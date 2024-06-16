export enum CellType {
  TEXT = 'text',
  BUTTON = 'button'
}

export interface CellBaseProps {
  label: string
  value?: string
  description?: string
  type: CellType
}
