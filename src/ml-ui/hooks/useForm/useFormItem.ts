import { inject, toRef } from 'vue'
import {
  formItemInjectionKey,
  type FormItemContext
} from '@meleon/uni-ui/lib/ml-form-item'

export default function useFormItem() {
  const formItemCtx = inject(formItemInjectionKey, {} as FormItemContext)

  const eventsHanlders = toRef(formItemCtx, 'eventsHanlder')

  return {
    formItemCtx,
    eventsHanlders
  }
}
