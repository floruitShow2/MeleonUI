import HomeLocale from '@/pages/home/locale/en-US'
import ProfileLocale from '@/pages/profile/locale/en-US'

const defaultLocale = {
  'default.confirm.text': 'confirm',
  'default.cancel.text': 'cancel'
}

const enUS = {
  ...defaultLocale,
  ...HomeLocale,
  ...ProfileLocale
}
export default enUS
