import HomeLocale from '@/pages/home/locale/zh-CN'
import ProfileLocale from '@/pages/profile/locale/zh-CN'

const defaultLocale = {
  'default.confirm.text': '确认',
  'default.cancel.text': '取消'
}

const zhCN = {
  ...defaultLocale,
  ...HomeLocale,
  ...ProfileLocale
}
export default zhCN
