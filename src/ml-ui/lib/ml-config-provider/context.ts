import type { InjectionKey } from 'vue'
import type { ColorType } from '@meleon/uni-ui/hooks'

export interface ConfigProviderContext {
  themes: Record<ColorType, string>
}

const configProviderInjectionKey: InjectionKey<ConfigProviderContext> = Symbol('ml-config-provider')

export { configProviderInjectionKey }
