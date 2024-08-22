import { inject, ref, reactive, computed } from 'vue'
import { configProviderInjectionKey } from '../lib/ml-config-provider/context'
import zhCN from './zhCN'
import enUS from './enUS'

const LOCALE = ref<MeleonLocale.LocaleCategory>('zh-CN')
const I18N_MESSAGE_MAP = reactive<
  Record<MeleonLocale.LocaleCategory, MeleonLocale.CoreLocale>
>({
  'zh-CN': zhCN,
  'en-US': enUS
})

export const useI18n = () => {
  const configProviderCtx = inject(configProviderInjectionKey, null)

  const i18n = computed(() => {
    if (configProviderCtx) {
      return configProviderCtx.locale
    } else {
      return I18N_MESSAGE_MAP[LOCALE.value]
    }
  })

  const curLocale = computed(() => i18n.value.locale)
  const transform = (key: string) => {
    const keyArr = key.split('.')

    let temp: any = i18n.value

    for (const item of keyArr) {
      if (!temp[item]) {
        return key
      }
      temp = temp[item]
    }

    return temp
  }

  return {
    i18n,
    locale: curLocale,
    t: transform
  }
}
