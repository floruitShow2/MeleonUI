export interface LocaleCoreOptionsType {
  locale: 'zh-CN' | 'en-US'
  messages: {
    'zh-CN': Record<string, string>
    'en-US': Record<string, string>
  }
}

export class LocaleCore {
  static instance: LocaleCore
  zhCN: Record<string, string> = {}
  enUS: Record<string, string> = {}
  locale: 'zh-CN' | 'en-US' = 'en-US'
  constructor(options?: LocaleCoreOptionsType) {
    if (LocaleCore.instance) return LocaleCore.instance
    LocaleCore.instance = this
    this.initLocale(options)
  }
  $t(key: string) {
    console.log(key, this)
    switch (this.locale) {
      case 'zh-CN':
        return this.zhCN[key] || ''
      case 'en-US':
        return this.enUS[key] || ''
      default:
        return ''
    }
  }
  changeLocale(value: 'zh-CN' | 'en-US') {
    this.locale = value
  }
  getLocale() {
    console.log(this.locale)
    return this.locale === 'zh-CN' ? this.zhCN : this.enUS
  }
  setLocale(options: LocaleCoreOptionsType) {
    this.initLocale(options)
  }
  private initLocale(options?: LocaleCoreOptionsType) {
    if (!options) return
    const { locale, messages } = options
    if (locale) this.locale = locale
    if (messages) {
      this.zhCN = { ...this.zhCN, ...(messages['zh-CN'] || {}) }
      this.enUS = { ...this.enUS, ...(messages['en-US'] || {}) }
    }
    console.log(this)
  }
}
