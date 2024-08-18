import { toRefs, computed, watch } from 'vue'
import type { Dayjs } from 'dayjs'
import { convertDate2Dayjs, isUndefined } from '@meleon/uni-ui/utils'
import type { TimePickerProps } from '@meleon/uni-ui/lib'
import { useState } from '../useState'

interface TimeStateProps {
  modelValue: TimePickerProps['modelValue']
  defaultModelValue: TimePickerProps['defaultModelValue']
  format: string
}

export default function useTimeState(props: TimeStateProps) {
  const { modelValue, defaultModelValue, format } = toRefs(props)

  const computedModelValue = computed(() => convertDate2Dayjs(modelValue.value, format.value))
  const computedDefaultModelValue = computed(() =>
    convertDate2Dayjs(defaultModelValue.value, format.value)
  )

  const [localValue, setLocalValue] = useState<Dayjs | undefined>(
    !isUndefined(computedModelValue.value)
      ? computedModelValue.value
      : !isUndefined(computedDefaultModelValue.value)
        ? computedDefaultModelValue.value
        : undefined
  )

  // 最终状态
  const computedValue = computed(() => computedModelValue.value || localValue.value)

  const [panelValue, setPanelValue] = useState<Dayjs | undefined>(computedValue.value)
  watch(computedValue, (newVal) => {
    setPanelValue(newVal)
  })

  return {
    localValue: computedValue,
    setLocalValue,
    panelValue,
    setPanelValue
  }
}
