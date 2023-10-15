import { defineStore } from 'pinia'
import type { AppState } from './type'
import { generateDeviceUI } from '@/utils/device'
import { setStorage } from '@/utils/storage'
import { AppStorageKeys } from '@/common'
import { LocaleCore } from '@/locale/core'

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: 'light',
    locale: 'zh-CN',
    ui: {
      screenWidth: 0,
      menuButtonWidth: 0,
      screenHeight: 0,
      windowHeight: 0,
      statusBarHeight: 0,
      customBarHeight: 0,
      contentHeight: 0,
      tabbarHeight: 0,
      bottomBarHeight: 0
    }
  }),
  getters: {
    appTheme(state: AppState) {
      return state.theme
    },
    appSize(state: AppState) {
      return state.ui
    },
    appLocale(state: AppState) {
      return state.locale
    }
  },
  actions: {
    updateDeviceUI() {
      this.ui = generateDeviceUI().ui
    },
    toggleTheme(theme: string) {
      this.theme = theme
    },
    async toggleLocale(locale: AppState['locale']) {
      const localeCore = new LocaleCore()
      this.locale = locale
      localeCore.changeLocale(locale)
      await setStorage(AppStorageKeys['locale'], locale)
    }
  }
})

export default useAppStore
