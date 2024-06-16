import { computed } from 'vue'
import { initThemeSetting, getColorsOverride } from './index'
import type { ColorType, ColorKey } from './index'

export default function useTheme(theme?: Record<string, string>, isDark = false) {
  const { themeColor, otherColor } = initThemeSetting(theme || {}, isDark)
  const params: Record<ColorType, string> = {
    primary: themeColor,
    ...otherColor
  }

  const { common } = getColorsOverride(params)
  const themeColors = computed(() => {
    const style: Record<string, string> = {}
    Object.keys(common).map((k) => {
      style[`--${k}`] = common[k as ColorKey] || ''
    })
    return style
  })

  return {
    themeColors
  }
}
