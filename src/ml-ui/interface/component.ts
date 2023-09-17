import type { ColorKey } from '../src/theme/index'

// Base Component
export interface MlComponent {
  ui: Record<string, number>
  themeColors?: Partial<Record<ColorKey, string>>
}
