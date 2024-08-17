import { computed, toRefs, type ComputedRef } from 'vue'
import type { TimePickerProps } from '@meleon/uni-ui/lib'
import { padStart } from '@/ml-ui/utils'
import type { TimeList } from '@meleon/uni-ui/lib/ml-time-picker'

interface TimeListProps extends Pick<TimePickerProps, 'step'> {
  selectedHour: number | undefined
  selectedMinute: number | undefined
  selectedSecond: number | undefined
}
export default function useTimeList(props: TimeListProps): {
  hours: ComputedRef<TimeList>
  minutes: ComputedRef<TimeList>
  seconds: ComputedRef<TimeList>
} {
  const { step, selectedHour, selectedMinute, selectedSecond } = toRefs(props)

  const hours = computed(() => {
    const { hour: hourStep = 1 } = step?.value || {}
    let list = []
    for (let i = 0; i < 24; i += hourStep) {
      list.push(i)
    }

    return list.map((h) => ({
      id: `hour${h}`,
      label: padStart(h, 2, '0'),
      value: h,
      selected: selectedHour.value === h
    }))
  })

  const minutes = computed(() => {
    const { minute: minuteStep = 1 } = step?.value || {}
    let list = []
    for (let i = 0; i < 60; i += minuteStep) {
      list.push(i)
    }
    return list.map((m) => ({
      id: `minute${m}`,
      label: padStart(m, 2, '0'),
      value: m,
      selected: selectedMinute.value === m
    }))
  })

  const seconds = computed(() => {
    const { second: secondStep = 1 } = step?.value || {}
    let list = []
    for (let i = 0; i < 60; i += secondStep) {
      list.push(i)
    }
    return list.map((s) => ({
      id: `second${s}`,
      label: padStart(s, 2, '0'),
      value: s,
      selected: selectedSecond.value === s
    }))
  })

  return {
    hours,
    minutes,
    seconds
  }
}
