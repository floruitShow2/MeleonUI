<template>
  <CellGroup :class="className" :style="themeColors">
    <slot />
  </CellGroup>
</template>

<script setup lang="ts">
  import { ref, toRefs, reactive, computed, provide } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs } from '@meleon/uni-ui/utils'
  import type { FormProps } from './index.interface'
  import { formInjectionKey, type FieldItemEntity } from './context'
  import CellGroup from '../ml-cell-group/index.vue'

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

  const fields: FieldItemEntity[] = []

  provide(
    formInjectionKey,
    reactive({
      model,
      rules,
      disabled,
      fields
    })
  )
</script>

<style lang="less">
  @import './index.less';
</style>
