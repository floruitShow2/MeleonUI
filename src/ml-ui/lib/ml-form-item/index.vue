<template>
  <Cell
    :label="label"
    :description="validateMessage"
    :desc-style="validateMessageStyle"
  >
    <template #value>
      <slot></slot>
    </template>
  </Cell>
</template>

<script setup lang="ts">
  import {
    ref,
    toRefs,
    reactive,
    computed,
    provide,
    inject,
    onMounted
  } from 'vue'
  import type { PropType } from 'vue'
  import { Schema } from 'b-validate'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { useI18n } from '@meleon/uni-ui/locale'
  import { cs, getValueByPath } from '@meleon/uni-ui/utils'
  import Cell from '../ml-cell/index.vue'
  import { formInjectionKey } from '../ml-form'
  import type { FieldRule, ValidateStatus } from '../ml-form'
  import { formItemInjectionKey } from './context'
  import type {
    FormItemEntity,
    FormItemEventHandler,
    FormItemProps,
    ValidateTrigger
  } from './index.interface'

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
  const {
    field,
    label,
    required,
    rules: localRules,
    validateTrigger
  } = toRefs(props)

  const emit = defineEmits([])

  const { i18n } = useI18n()

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

  const validateStatus = ref<ValidateStatus | ''>('')
  const validateMessage = ref<string>('')
  const validateMessageStyle = computed(() => {
    switch (validateStatus.value) {
      case 'success':
        return { color: 'var(--success-color-6)' }
      case 'warning':
        return { color: 'var(--warning-color-6)' }
      case 'error':
        return { color: 'var(--danger-color-6)' }
      default:
        return {}
    }
  })

  const updateFieldState = (
    field: string,
    state: { status: ValidateStatus | ''; message: string }
  ) => {
    const { status, message } = state
    validateStatus.value = status
    validateMessage.value = message
  }

  const validateField = (): Promise<any> => {
    const rules = mergedRules.value
    const _field = field.value
    const _value = fieldValue.value

    updateFieldState(_field, { status: '', message: '' })

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
        validateMessages: i18n.value.form.validateMessages
      }
    )

    return new Promise((resolve) => {
      schema.validate({ [_field]: _value }, (err: Record<string, any>) => {
        const isError = Boolean(err?.[_field])

        updateFieldState(_field, {
          status: isError ? 'error' : '',
          message: isError ? err[_field].message : ''
        })

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

  provide(
    formItemInjectionKey,
    reactive({
      eventsHanlder
    })
  )
</script>

<style lang="less">
  @import './index.less';
</style>
