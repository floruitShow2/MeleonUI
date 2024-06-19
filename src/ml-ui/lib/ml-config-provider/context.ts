import type { InjectionKey } from 'vue'
import type { ColorType } from '~/hooks/useTheme'

export interface ConfigProviderContext {
  themes: Record<ColorType, string>
}

const configProviderInjectionKey: InjectionKey<ConfigProviderContext> = Symbol('ml-config-provider')

export { configProviderInjectionKey }
