import { computed, toRefs, watch, type ComputedRef } from 'vue'
import type { Dayjs } from 'dayjs'
import { convertDate2Dayjs, isUndefined } from '@meleon/uni-ui/utils'
import { useState } from '../useState'

interface PickerStateProps {
  modelValue: MeleonDatetime.DateValue | undefined
  defaultValue: MeleonDatetime.DateValue | undefined
  format: string
}

/**
 * @description 将 dateTimePicker 组件传入的 modelValue 和 defaultValue 转换为单个 Dayjs 对象
 * @param props PickerStateProps
 * @returns Dayjs
 */
export default function usePickerState(props: PickerStateProps) {
  const { modelValue, defaultValue, format } = toRefs(props)

  const computedModelValue = computed(() => {
    return convertDate2Dayjs(modelValue.value, format.value)
  })
  const computedDefaultValue = computed(() => {
    return convertDate2Dayjs(defaultValue.value, format.value)
  })

  const [localValue, setLocalValue] = useState<Dayjs | undefined>(
    !isUndefined(computedModelValue.value)
      ? computedModelValue.value
      : !isUndefined(computedDefaultValue.value)
      ? computedDefaultValue.value
      : undefined
  )
  watch(computedModelValue, (newVal) => {
    if (isUndefined(newVal)) {
      setLocalValue(undefined)
    }
  })

  const mergedValue = computed(() => {
    return computedModelValue.value || localValue.value
  })

  return [mergedValue, setLocalValue] as [
    ComputedRef<Dayjs | undefined>,
    (value: Dayjs | undefined) => void
  ]
}
