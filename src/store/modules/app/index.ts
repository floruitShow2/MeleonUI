import { defineStore } from 'pinia'
import type { AppState } from './type'
import { generateDeviceUI } from '@/utils/device'

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: 'light',
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
    }
  },
  actions: {
    updateDeviceUI() {
      this.ui = generateDeviceUI().ui
    },
    toggleTheme(theme: string) {
      this.theme = theme
    }
  }
})

export default useAppStore
