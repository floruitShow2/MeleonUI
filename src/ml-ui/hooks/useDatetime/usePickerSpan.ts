import { computed, toRefs } from 'vue'
import type { DatetimePickerProps } from '@meleon/uni-ui/lib'

export default function usePickerSpan(props: Pick<DatetimePickerProps, 'mode'>) {
  const { mode } = toRefs(props)

  // 单个面板显示多少月份 | 单箭头跨越多少月份
  const span = computed(
    () => ({ date: 1, week: 1, year: 10 * 12, quarter: 12, month: 12 })[mode.value]
  )

  // 双箭头跨越多少个月份
  const superSpan = computed(() => (['year'].includes(mode.value) ? 10 * 12 : 12))

  return {
    span,
    superSpan
  }
}
