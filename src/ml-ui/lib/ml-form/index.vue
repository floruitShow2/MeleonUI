<template>
  <CellGroup :class="className" :style="themeColors">
    <slot />
  </CellGroup>
</template>

<script setup lang="ts">
  import { ref, toRefs, reactive, computed, provide } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs, isArray, isFunction } from '@meleon/uni-ui/utils'
  import CellGroup from '../ml-cell-group/index.vue'
  import type { FormEvents, FormProps, ValidateError } from './index.interface'
  import { formInjectionKey } from './context'
  import type { FormItemEntity } from '../ml-form-item/index.interface'

  const props = defineProps({
    model: {
      type: Object as PropType<FormProps['model']>,
      required: true
    },
    rules: {
      type: Object as PropType<FormProps['rules']>,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })
  const { model, rules, disabled } = toRefs(props)

  const emit = defineEmits([])

  const { themeColors } = useTheme()

  const prefix = ref('ml-form')
  const className = computed(() => {
    return cs(prefix.value)
  })

  const localFields = ref<FormItemEntity[]>([])
  const addField = (formItem: FormItemEntity) => {
    if (formItem && formItem.field) {
      localFields.value.push(formItem)
      console.log(localFields.value)
    }
  }
  const validateFields: FormEvents['validateFields'] = (fields, callback) => {
    const list: Promise<any>[] = localFields.value
      .filter(
        (item) =>
          (isArray(fields) && fields.includes(item.field)) ||
          item.field === fields
      )
      .map((item) => item.validateField())

    return Promise.all(list).then((result) => {
      const errors: Record<string, ValidateError> = {}
      let hasError: boolean = false
      result.forEach((item) => {
        if (item) {
          hasError = true
          errors[item.field] = item
        }
      })

      if (isFunction(callback)) {
        callback(hasError ? errors : undefined)
      }

      return hasError ? errors : undefined
    })
  }

  provide(
    formInjectionKey,
    reactive({
      model,
      rules,
      disabled,
      fields: localFields,
      addField,
      validateFields
    })
  )

  defineExpose({
    validateFields
  })
</script>

<style lang="less">
  @import './index.less';
</style>
