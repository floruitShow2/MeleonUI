export interface AppState {
  theme: string
  ui: {
    // 屏幕宽度
    screenWidth: number
    // 微信小程序右上角按钮宽度
    menuButtonWidth: number
    // 屏幕高度
    screenHeight: number
    windowHeight: number
    // 电量、时间等信息所在状态栏的高度
    statusBarHeight: number
    // 顶部导航栏高度
    customBarHeight: number
    // 内容区域高度
    contentHeight: number
    // 底部导航栏高度
    tabbarHeight: number
    // 底部安全区域高度
    bottomBarHeight: number
  }
}
