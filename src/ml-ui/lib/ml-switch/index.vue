<template>
  <view :class="className" :style="styles" @click="handleClick">
    <view v-if="modelValue && type !== 'line'" :class="`${prefix}-checked`">
      <slot name="checked"></slot>
    </view>
    <view :class="`${prefix}-handler`"></view>
    <view v-if="!modelValue && type !== 'line'" :class="`${prefix}-unchecked`">
      <slot name="unchecked"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import { useFormItem, useTheme } from '@meleon/uni-ui/hooks'
  import { cs } from '@meleon/uni-ui/utils'
  import type { SwitchProps } from './index.interface'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<SwitchProps['type']>,
      default: 'square'
    },
    checkedColor: {
      type: String,
      default: 'var(--primary-color-6)'
    },
    uncheckedColor: {
      type: String,
      default: 'var(--info-color-4)'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    beforeSwitch: {
      type: Function as PropType<SwitchProps['beforeSwitch']>,
      default: () => true
    }
  })
  const { modelValue, type, checkedColor, uncheckedColor, beforeSwitch } =
    toRefs(props)

  const emit = defineEmits(['update:modelValue', 'change'])
  const { eventsHanlders, disabled } = useFormItem({ disabled: props.disabled })

  const { themeColors } = useTheme()

  const prefix = ref('ml-switch')
  const className = computed(() => {
    return cs(prefix.value, `${prefix.value}--${type.value}`, {
      [`${prefix.value}--disabled`]: disabled.value,
      [`${prefix.value}--active`]: modelValue.value
    })
  })
  const styles = computed(() => {
    return {
      ...themeColors.value,
      '--switch-checked-color': checkedColor.value,
      '--switch-unchecked-color': uncheckedColor.value
    }
  })

  const handleClick = async (e: MouseEvent) => {
    if (disabled.value) return
    if (!(await beforeSwitch.value(!modelValue.value))) return
    emit('update:modelValue', !modelValue.value)
    emit('change', !modelValue.value)
    eventsHanlders.value.onChange?.(e)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
