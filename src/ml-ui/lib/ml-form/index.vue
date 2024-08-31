<template>
  <CellGroup :class="className">
    <slot />
  </CellGroup>
</template>

<script setup lang="ts">
  import { ref, toRefs, reactive, computed, provide } from 'vue'
  import type { PropType } from 'vue'
  import { cs, isArray, isFunction, isUndefined } from '@meleon/uni-ui/utils'
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
    },
    labelWidth: {
      type: String,
      default: '50%'
    }
  })
  const { model, rules, disabled, labelWidth } = toRefs(props)

  const emit = defineEmits(['submit'])

  const prefix = ref('ml-form')
  const className = computed(() => {
    return cs(prefix.value)
  })

  const localFields = ref<FormItemEntity[]>([])
  const addField = (formItem: FormItemEntity) => {
    if (formItem && formItem.field) {
      localFields.value.push(formItem)
    }
  }

  /**
   * @description 校验指定字段的表单项
   * @param fields field 字符串数组
   * @param callback 校验结束回调
   */
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
  const validate = async () => {
    const fields = localFields.value.map((item) => item.field)
    const res = await validateFields(fields)
    emit('submit', {
      errors: res,
      fields: localFields.value,
      model: model.value
    })
    return res
  }

  const clearValidate = (field?: string | string[]) => {
    const _fields = isUndefined(field) ? [] : ([] as string[]).concat(field)

    localFields.value.forEach((item) => {
      if (_fields.length === 0 || _fields.includes(item.field)) {
        item.clearValidate()
      }
    })
  }

  provide(
    formInjectionKey,
    reactive({
      model,
      rules,
      disabled,
      fields: localFields,
      labelWidth,
      addField,
      validate,
      validateFields
    })
  )

  defineExpose({
    validate,
    validateFields,
    clearValidate
  })
</script>

<style lang="less">
  @import './index.less';
</style>
