import type { ColorType } from '@meleon/uni-ui/hooks'

export interface ConfigProviderProps {
  themes: Partial<Record<ColorType, string>>
}
