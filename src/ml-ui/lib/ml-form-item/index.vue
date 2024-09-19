<template>
  <Cell
    :class="className"
    :label="label"
    :type="
      formItemEntity.field === 'submit'
        ? CellTypeEnum.BUTTON
        : CellTypeEnum.CUSTOM
    "
    :label-width="mergedLabelWidth"
    :disabled="mergedDisabled"
    :description="validateMessage"
    :desc-style="validateMessageStyle"
    @btn-click="handleBtnClick"
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
  import { useI18n } from '@meleon/uni-ui/locale'
  import { cs, getValueByPath, isUndefined } from '@meleon/uni-ui/utils'
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
  import { CellTypeEnum } from '../ml-cell'

  const props = defineProps({
    field: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: ''
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
      default: undefined
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
    labelWidth,
    required,
    disabled,
    rules: localRules,
    validateTrigger
  } = toRefs(props)

  const emit = defineEmits([])

  const { i18n } = useI18n()

  const formCtx = inject(formInjectionKey, null)

  const prefix = ref('ml-form-item')
  const className = computed(() => {
    return cs(prefix.value)
  })

  const initialValue = getValueByPath(formCtx?.model, field.value)
  const fieldValue = computed(() => {
    return getValueByPath(formCtx?.model, field.value)
  })

  // 合并的规则
  const mergedRules = computed(() => {
    const baseRules = ([] as FieldRule[]).concat(
      localRules.value.length
        ? localRules.value
        : formCtx?.rules[field.value] ?? []
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

  const mergedLabelWidth = computed(() => {
    return labelWidth.value || formCtx?.labelWidth || '50%'
  })

  const mergedDisabled = computed(() => {
    return isUndefined(disabled?.value)
      ? Boolean(formCtx?.disabled)
      : Boolean(disabled?.value)
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
  const isError = computed(() => {
    return validateStatus.value === 'error'
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

  const clearValidate = () => {
    if (formItemEntity.field) {
      updateFieldState(field.value, {
        status: '',
        message: ''
      })
    }
  }

  const formItemEntity: FormItemEntity = reactive({
    field: field.value,
    disabled: false,
    validateField,
    clearValidate
  })

  onMounted(() => {
    if (formItemEntity.field && formItemEntity.field !== 'submit' && formCtx) {
      formCtx.addField(formItemEntity)
    }
  })

  const validateTriggers = computed(() => {
    const result = mergedRules.value
      .map((item) => item.trigger)
      .filter((item) => !!item)
      .flat() as ValidateTrigger[]

    return ([] as ValidateTrigger[])
      .concat(validateTrigger.value)
      .concat(result)
  })
  const eventsHanlder = computed<FormItemEventHandler>(() => {
    return validateTriggers.value.reduce((event, trigger) => {
      switch (trigger) {
        case 'change':
          event.onChange = () => {
            validateField()
          }
          return event
        case 'focus':
          event.onFocus = () => {
            validateField()
          }
          return event
        case 'blur':
          event.onBlur = () => {
            validateField()
          }
          return event
        case 'input':
          event.onInput = () => {
            validateField()
          }
          return event
        default:
          return event
      }
    }, {} as FormItemEventHandler)
  })

  const handleBtnClick = () => {
    // 仅限 提交按钮 触发校验
    if (formItemEntity.field === 'submit') {
      formCtx && formCtx?.validate()
    }
  }

  provide(
    formItemInjectionKey,
    reactive({
      eventsHanlder,
      disabled: mergedDisabled,
      isError
    })
  )
</script>

<style lang="less">
  @import './index.less';
</style>
