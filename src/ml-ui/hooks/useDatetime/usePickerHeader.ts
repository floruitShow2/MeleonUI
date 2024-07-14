import { computed, reactive, toRefs } from 'vue'
import type { Dayjs } from 'dayjs'
import { useState } from '@meleon/uni-ui/hooks'
import { formatDateValue, getNow, methods } from '@meleon/uni-ui/utils'
import { usePickerSpan } from './index'
import type { DatetimePickerProps } from '@meleon/uni-ui/lib'

export interface PickerHeaderInput {
    mode: MeleonDatetime.DateMode
    modelValue: MeleonDatetime.DateValue | undefined
    defaultModelValue: MeleonDatetime.DateValue | undefined
    format: string
    onChange: (val: Dayjs) => void
}
export default function usePickerHeader(input: PickerHeaderInput) {
  const { mode, modelValue, defaultModelValue, format, onChange } = toRefs(input)

  const computedMode = computed(() => {
    return mode.value || 'date'
  })

  const { span, superSpan } = usePickerSpan(
    reactive({
      mode: computedMode,
    })
  )

  const computedValue = computed(() => {
    return formatDateValue(modelValue.value, format.value)
  })

  const computedDefaultValue = computed(() => {
    return formatDateValue(defaultModelValue.value, format.value)
  })

  const isSame = (current: Dayjs, target: Dayjs) => {
    const unit = computedMode.value === 'date' || computedMode.value === 'week' ? 'M' : 'y'
    return current.isSame(target, unit)
  }

  const [localValue, setLocalValue] = useState(computedDefaultValue.value || getNow())

  const headerValue = computed(() => computedValue.value || localValue.value)

  const setHeaderValue = (newVal: Dayjs | undefined, emitChange = true) => {
    if (!newVal) return
    if (emitChange && !isSame(headerValue.value, newVal)) {
      onChange?.value?.(newVal)
    }
    setLocalValue(newVal)
  }

  const showSingleBtn = computed(() => span.value !== superSpan.value)
  const headerOperations = computed(() => ({
    onSuperPrev: () => {
      setHeaderValue(methods.subtract(headerValue.value, superSpan.value, 'M'))
    },
    onPrev: showSingleBtn.value
      ? () => {
          setHeaderValue(methods.subtract(headerValue.value, span.value, 'M'))
        }
      : undefined,
    onNext: showSingleBtn.value
      ? () => {
          setHeaderValue(methods.add(headerValue.value, span.value, 'M'))
        }
      : undefined,
    onSuperNext: () => {
      setHeaderValue(methods.add(headerValue.value, superSpan.value, 'M'))
    }
  }))

  return {
    headerValue,
    setHeaderValue,
    headerOperations
  }
}
