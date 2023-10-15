import type { App } from 'vue'
import { LocaleCore } from './core'
import type { LocaleCoreOptionsType } from './core'
import { zhCN, enUS } from './lang'

export default {
  install(app: App, options?: LocaleCoreOptionsType) {
    const defaultOptions: LocaleCoreOptionsType = {
      locale: 'zh-CN',
      messages: {
        'zh-CN': zhCN,
        'en-US': enUS
      }
    }
    const core = new LocaleCore(
      options
        ? {
            locale: options.locale || 'zh-CN',
            messages: {
              'zh-CN': { ...zhCN, ...options.messages['zh-CN'] },
              'en-US': { ...enUS, ...options.messages['en-US'] }
            }
          }
        : defaultOptions
    )
    app.config.globalProperties.$t = core.$t.bind(core)
  }
}
