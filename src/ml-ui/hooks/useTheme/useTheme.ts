import { computed, inject } from 'vue'
import { configProviderInjectionKey } from '@meleon/uni-ui/lib/ml-config-provider/context'
import { initThemeSetting, getColorsOverride } from './index'
import type { ColorType, ColorKey } from './index'

export default function useTheme(
  themes?: Record<ColorType, string>,
  isDark = false
) {
  // 接收全局注入的主题配置
  const globalCtx = inject(configProviderInjectionKey, null)

  const { themeColor, otherColor } = initThemeSetting(
    { ...(globalCtx?.themes || {}), ...(themes || {}) },
    isDark
  )
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
