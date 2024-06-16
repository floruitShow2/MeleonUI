import themeSettings from './themeSettings'
import { deepClone, isNotEmptyObject } from '../../utils'
import { getColorPalette } from './color'
/**
 * 初始化主题配置
 * @param isDark 是否处于暗黑模式
 * @param customColors 提供自定义主题
 */
export function initThemeSetting(
  customColors: Record<string, string> = {},
  isDark: boolean = false
) {
  const settings = deepClone(themeSettings)
  if (customColors && isNotEmptyObject(customColors)) {
    const { primary, ...resetColors } = customColors
    const { themeColor, otherColor } = themeSettings
    settings.darkMode = isDark
    settings.themeColor = primary || themeColor
    settings.otherColor = { ...otherColor, ...resetColors }
  }
  return settings
}
type ColorScene = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type ThemeColor = Partial<Record<ColorKey, string>>
export type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'danger'
export type ColorKey = `${ColorType}-color-${ColorScene}`

interface ColorAction {
  scene: ColorScene
  handler: (color: string) => string
}
/**
 *
 * @param colors k: ColorType v: string
 */
function getSceneTheme(colors: Record<string, string>) {
  const colorActions: ColorAction[] = [
    { scene: 1, handler: (color) => getColorPalette(color, 1) },
    { scene: 2, handler: (color) => getColorPalette(color, 2) },
    { scene: 3, handler: (color) => getColorPalette(color, 3) },
    { scene: 4, handler: (color) => getColorPalette(color, 4) },
    { scene: 5, handler: (color) => getColorPalette(color, 5) },
    { scene: 6, handler: (color) => getColorPalette(color, 6) },
    { scene: 7, handler: (color) => getColorPalette(color, 7) },
    { scene: 8, handler: (color) => getColorPalette(color, 8) },
    { scene: 9, handler: (color) => getColorPalette(color, 9) }
  ]

  const themeColor: ThemeColor = {}
  Object.keys(colors).forEach((ColorType) => {
    colorActions.forEach((action) => {
      const colorKey: ColorKey = `${ColorType as ColorType}-color-${action.scene}`
      themeColor[colorKey] = action.handler(colors[ColorType])
    })
  })
  return themeColor
}

export function getColorsOverride(colors: Record<ColorType, string>) {
  const { primary, success, warning, danger, info } = colors
  return {
    common: getSceneTheme({
      primary,
      info,
      success,
      warning,
      danger
    })
  }
}
