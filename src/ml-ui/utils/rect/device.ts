interface MenuButtonRect {
  top: number
  height: number
  width: number
  left: number
  right: number
}

export const generateDeviceUI = function () {
  // 菜单按钮尺寸信息
  let menuButtonRect: MenuButtonRect = {
    top: 0,
    width: 0,
    height: 0,
    left: 0,
    right: 0
  }
  // 设备尺寸信息
  let systemRect: Record<string, number> = {}

  if (uni.getMenuButtonBoundingClientRect) {
    // 小程序
    const { top, height, width, left, right } =
      uni.getMenuButtonBoundingClientRect()
    const {
      screenWidth,
      screenHeight,
      safeArea = { height: 0 },
      statusBarHeight = 0
    } = uni.getSystemInfoSync()

    menuButtonRect = { top, height, width, left, right }
    systemRect = {
      screenWidth,
      screenHeight,
      safeAreaHeight: safeArea.height,
      statusBarHeight
    }
  } else {
    // h5
    const { screenWidth, screenHeight } = {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    }
    systemRect = {
      screenWidth,
      screenHeight,
      safeAreaHeight: screenHeight,
      statusBarHeight: 0
    }
  }

  const { top, height, width, right } = menuButtonRect
  const { screenWidth, screenHeight, safeAreaHeight, statusBarHeight } =
    systemRect

  const customBarHeight = (top - statusBarHeight) * 2 + height
  const tabbarHeight = 50
  const contentHeight = safeAreaHeight - customBarHeight - tabbarHeight
  const bottomBarHeight = screenHeight - safeAreaHeight - statusBarHeight
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
      windowHeight: safeAreaHeight,
      screenHeight
    },
    menuButton: menuButtonRect
  }
}
