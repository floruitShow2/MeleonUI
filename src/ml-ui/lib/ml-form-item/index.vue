<template>
  <Cell :label="label" :description="extra" value="11">
    <template #value>
      <slot></slot>
    </template>
  </Cell>
</template>

<script setup lang="ts">
  import { ref, toRefs, reactive, computed, provide, inject, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import { Schema } from 'b-validate'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs, getValueByPath } from '@meleon/uni-ui/utils'
  import Cell from '../ml-cell/index.vue'
  import { formInjectionKey } from '../ml-form'
  import type { FieldRule } from '../ml-form'
  import { formItemInjectionKey } from './context'
  import type { FormItemEntity, FormItemEventHandler, FormItemProps, ValidateTrigger } from './index.interface'

  const props = defineProps({
    field: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    extra: {
      type: String,
      default: ''
    },
    rules: {
      type: Array as PropType<FormItemProps['rules']>,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    validateTrigger: {
      type: [String, Array] as PropType<ValidateTrigger | ValidateTrigger[]>,
      default: 'change'
    }
  })
  const { field, label, required, rules: localRules, validateTrigger } = toRefs(props)

  const emit = defineEmits([])

  const formCtx = inject(formInjectionKey, null)

  const { themeColors } = useTheme()

  const prefix = ref('ml-form-item')
  const className = computed(() => {
    return cs(prefix.value)
  })

  const initialValue = getValueByPath(formCtx?.model, field.value)
  const fieldValue = computed(() => {
    return getValueByPath(formCtx?.model, field.value)
  })

  const mergedRules = computed(() => {
    const baseRules = ([] as FieldRule[]).concat(
      localRules.value ?? formCtx?.rules[field.value] ?? []
    )

    const hasRequired = baseRules.some((rule) => rule.required)
    if (required.value && !hasRequired) {
      baseRules.unshift({ required: true })
    }

    return baseRules
  })
  const isRequired = computed(() => {
    return mergedRules.value.some((rule) => !!rule.required)
  })

  const validateField = (): Promise<any> => {
    const rules = mergedRules.value
    const _field = field.value
    const _value = fieldValue.value

    const schema = new Schema(
      {
        [_field]: rules.map((rule) => {
          if (!rule.type) {
            rule.type = 'string'
          }
          return rule
        })
      },
      {
        ignoreEmptyString: true,
        validateMessages: {
          required: 'required'
        }
      }
    )

    return new Promise((resolve) => {
      schema.validate({ [_field]: _value }, (err: Record<string, any>) => {
        const isError = Boolean(err?.[_field])

        console.log('a', err)

        const error = isError
          ? {
              label: label.value,
              field: _field,
              value: err[_field].value,
              type: err[_field].type,
              message: err[_field].message
            }
          : undefined

        resolve(error)
      })
    })
  }

  const formItemEntity: FormItemEntity = reactive({
    field: field.value,
    disabled: false,
    validateField
  })

  onMounted(() => {
    if (formItemEntity.field && formCtx) {
      formCtx.addField(formItemEntity)
    }
  })

  const validateTriggers = computed(() => {
    return ([] as ValidateTrigger[]).concat(validateTrigger.value)
  })
  const eventsHanlder = computed<FormItemEventHandler>(() => {
    return validateTriggers.value.reduce((event, trigger) => {
      switch (trigger) {
        case 'change':
          event.onChange = () => {
            validateField()
          }
          return event
        case 'blur':
          event.onBlur = () => {
            validateField()
          }
          return event
        default:
          return event
      }
    }, {} as FormItemEventHandler)
  })

  provide(formItemInjectionKey, reactive({
    eventsHanlder
  }))
</script>

<style lang="less">
  @import './index.less';
</style>
