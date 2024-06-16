import type { ColorKey } from '../hooks/useTheme/index'

// Base Component
export interface MlComponent {
  ui: Record<string, number>
  themeColors?: Partial<Record<ColorKey, string>>
}
