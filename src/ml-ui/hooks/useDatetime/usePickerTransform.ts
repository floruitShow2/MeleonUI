import { toRefs } from 'vue'
import dayjs from 'dayjs'
import { useI18n } from '@meleon/uni-ui/locale'
import { getValueByPath } from '@meleon/uni-ui/utils'
import type { DatetimePickerProps } from '@meleon/uni-ui/lib/ml-datetime-picker'

export default function usePickerTransform(props: {
  locale?: DatetimePickerProps['locale']
}) {
  const { locale } = toRefs(props)
  const { locale: i18nLocale, t } = useI18n()
  dayjs.locale(i18nLocale.value.toLowerCase())

  const datePickerT: typeof t = (key: string) => {
    const keyForLocale = key.startsWith('datePicker.')
      ? key.split('.').slice(1).join('.')
      : key

    return getValueByPath(locale?.value || {}, keyForLocale) || t(key)
  }

  return datePickerT
}
