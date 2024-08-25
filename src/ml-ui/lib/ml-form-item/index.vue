<template>
  <Cell :label="label" :description="extra" value="11">
    <template #value>
      <slot></slot>
    </template>
  </Cell>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, inject, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs } from '@meleon/uni-ui/utils'
  import Cell from '../ml-cell/index.vue'
  import { formInjectionKey } from '../ml-form'
  import type { FieldRule } from '../ml-form'
  import type { FormItemProps } from './index.interface'

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
    }
  })
  const { field, required, rules: localRules } = toRefs(props)

  const emit = defineEmits([])

  const formCtx = inject(formInjectionKey, null)

  const { themeColors } = useTheme()

  const prefix = ref('ml-form-item')
  const className = computed(() => {
    return cs(prefix.value)
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
    return mergedRules.value.some(rule => !!rule.required)
  })

  onMounted(() => {
    console.log(props)
  })
</script>

<style lang="less">
  @import './index.less';
</style>
