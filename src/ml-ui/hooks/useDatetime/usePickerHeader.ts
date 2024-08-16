import { computed, reactive, toRefs, type Ref, watch, type ComputedRef } from 'vue'
import type { Dayjs } from 'dayjs'
import { useState } from '@meleon/uni-ui/hooks'
import { formatDateValue, getNow, methods } from '@meleon/uni-ui/utils'
import { usePickerSpan } from './index'

export interface PickerHeaderInput {
  mode: MeleonDatetime.DateMode | undefined
  pickerValue: MeleonDatetime.DateValue
  defaultPickerValue: MeleonDatetime.DateValue
  selectedValue: Dayjs | undefined
  format: string
  onChange: (val: Dayjs) => void
}
export default function usePickerHeader(input: PickerHeaderInput) {
  const { mode, pickerValue, defaultPickerValue, selectedValue, format, onChange } = toRefs(input)

  const computedMode = computed(() => {
    return mode.value || 'date'
  })

  const { span, superSpan } = usePickerSpan(
    reactive({
      mode: computedMode
    })
  )

  const computedValue = computed(() => {
    return formatDateValue(pickerValue.value, format.value)
  })

  const computedDefaultValue = computed(() => {
    return formatDateValue(defaultPickerValue.value, format.value)
  })

  const isSame = (current: Dayjs, target: Dayjs) => {
    const unit = computedMode.value === 'date' || computedMode.value === 'week' ? 'M' : 'y'
    return current.isSame(target, unit)
  }

  const [localValue, setLocalValue] = useState(computedDefaultValue.value || getNow())

  const headerValue = computed(() => computedValue.value || localValue.value)

  const setHeaderValue = (newVal: Dayjs | undefined, emitChange = true) => {
    if (!newVal) return
    // && !isSame(headerValue.value, newVal)
    if (emitChange) {
      onChange?.value?.(newVal)
    }
    setLocalValue(newVal)
  }

  // 选中值变更，触发 header 显示值变更
  if (selectedValue.value) {
    setLocalValue(selectedValue.value)
  }
  watch(
    () => selectedValue.value,
    (newVal) => {
      setHeaderValue(newVal)
    }
  )

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
    // 选择器头部信息
    headerValue,
    // 设置选择器头部信息
    setHeaderValue,
    // 选择器头部操作函数
    headerOperations
  }
}
