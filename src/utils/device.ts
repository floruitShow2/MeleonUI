export const generateDeviceUI = function () {
  const { top, height, width, right } = uni.getMenuButtonBoundingClientRect()
  const {
    screenWidth,
    screenHeight,
    safeArea = { height: 0 },
    statusBarHeight = 0
  } = uni.getSystemInfoSync()
  const customBarHeight = (top - statusBarHeight) * 2 + height
  const tabbarHeight = 50
  const contentHeight = safeArea.height - customBarHeight - tabbarHeight
  const bottomBarHeight = screenHeight - safeArea.height - statusBarHeight
  const menuButtonWidth = (screenWidth - right) * 2 + width
  return {
    ui: {
      screenWidth,
      statusBarHeight,
      menuButtonWidth,
      customBarHeight,
      contentHeight,
      tabbarHeight,
      bottomBarHeight,
      windowHeight: safeArea.height,
      screenHeight
    }
  }
}
