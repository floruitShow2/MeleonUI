import type { ColorType } from '@meleon/uni-ui/index'

export interface ConfigProviderProps {
  themes: Partial<Record<ColorType, string>>
}
