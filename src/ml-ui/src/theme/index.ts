import themeSettings from './themeSettings'
import { deepClone, isNotEmptyObject } from '../../utils'
import { getColorPalette, addColorAlpha } from './color'
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
type ColorScene = '' | 'Hover' | 'Pressed' | 'Active'
type ThemeColor = Partial<Record<ColorKey, string>>
export type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error'
export type ColorKey = `${ColorType}Color${ColorScene}`

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
    { scene: '', handler: (color) => color },
    { scene: 'Hover', handler: (color) => getColorPalette(color, 7) },
    { scene: 'Pressed', handler: (color) => addColorAlpha(color, 0.5) },
    { scene: 'Active', handler: (color) => getColorPalette(color, 5) }
  ]

  const themeColor: ThemeColor = {}
  Object.keys(colors).forEach((ColorType) => {
    colorActions.forEach((action) => {
      const colorKey: ColorKey = `${ColorType as ColorType}Color${action.scene}`
      themeColor[colorKey] = action.handler(colors[ColorType])
    })
  })
  return themeColor
}

export function getColorsOverride(colors: Record<ColorType, string>) {
  const { primary, success, warning, error, info } = colors
  return {
    common: getSceneTheme({
      primary,
      info,
      success,
      warning,
      error
    })
  }
}
