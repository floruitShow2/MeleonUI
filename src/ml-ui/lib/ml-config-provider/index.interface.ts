import type { ColorType } from '~/hooks/useTheme'

export interface ConfigProviderProps {
  themes: Partial<Record<ColorType, string>>
}
