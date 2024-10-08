import { toRefs, computed, watch } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { isUndefined } from '@meleon/uni-ui/utils'
import useState from './useState'

export default function useMergeState<T, E = T | undefined>(
  defaultValue: T,
  props: { value: E }
): [ComputedRef<T>, (val: E) => void, Ref<T>] {
  const { value } = toRefs(props)
  const [localValue, setLocalValue] = useState(
    !isUndefined(value.value) ? value.value : defaultValue
  )
  watch(
    value,
    (newVal) => {
      isUndefined(newVal) && setLocalValue(undefined)
    },
    { immediate: true }
  )

  const mergeValue = computed(() => {
    return !isUndefined(value.value) ? value.value : localValue.value
  })

  return [mergeValue, setLocalValue, localValue]
}
