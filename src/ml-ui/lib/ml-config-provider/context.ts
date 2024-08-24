import type { InjectionKey } from 'vue'
import type { ColorType } from '@meleon/uni-ui/hooks'

export interface ConfigProviderContext {
  themes: Partial<Record<ColorType, string>>
  locale?: MeleonLocale.CoreLocale | MeleonLocale.LocaleCategory
}

const configProviderInjectionKey: InjectionKey<ConfigProviderContext> =
  Symbol('ml-config-provider')

export { configProviderInjectionKey }
