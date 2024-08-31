import { computed, inject, toRef } from 'vue'
import {
  formItemInjectionKey,
  type FormItemContext
} from '@meleon/uni-ui/lib/ml-form-item'

interface UseFormItemProps {
  disabled?: boolean
}

export default function useFormItem(props: UseFormItemProps) {
  const formItemCtx = inject(formItemInjectionKey, {} as FormItemContext)

  const disabled = computed(() => {
    return props.disabled ?? formItemCtx?.disabled ?? false
  })

  const eventsHanlders = toRef(formItemCtx, 'eventsHanlder')

  return {
    formItemCtx,
    disabled,
    eventsHanlders
  }
}
