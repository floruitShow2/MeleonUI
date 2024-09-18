<template>
  <view :class="className" :style="themeColors">
    <view :class="inputClassName" @click="handleCheckedChange" />
    <view :class="`${prefix}__label`" @click="handleLabelClick">
      <slot></slot>
      <!-- <text v-if="!$slots.default">{{ label }}</text> -->
    </view>
  </view>
</template>

<script setup lang="ts">
  import {
    ref,
    toRefs,
    computed,
    inject,
    onMounted,
    getCurrentInstance
  } from 'vue'
  import type { PropType } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs } from '@meleon/uni-ui/utils'
  import { checkboxGroupInjectionKey } from '../ml-checkbox-group/context'
  import type { CheckboxProps } from './index.interface'

  const props = defineProps({
    checked: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<CheckboxProps['size']>,
      default: 'small'
    },
    value: {
      type: [String, Number],
      default: ''
    }
  })
  const {
    checked,
    indeterminate,
    disabled,
    size,
    value: modelValue
  } = toRefs(props)

  const emit = defineEmits(['update:checked'])

  const prefix = ref('ml-checkbox')

  const { themeColors } = useTheme()
  const { slots } = getCurrentInstance()!

  const globalCtx = inject(checkboxGroupInjectionKey, null)

  const className = computed(() => {
    return cs(prefix.value, `${prefix.value}-${size.value}`, {
      [`${prefix.value}-disabled`]:
        disabled.value ||
        (globalCtx
          ? globalCtx.getDisabledList().includes(modelValue.value)
          : false),
      [`${prefix.value}-underGroup`]: globalCtx !== null,
      [`${prefix.value}-only-input`]: !slots.default
    })
  })
  const inputClassName = computed(() => {
    return cs(`${prefix.value}__input`, {
      [`${prefix.value}__input-checked`]: globalCtx
        ? globalCtx.getCheckedList().includes(modelValue.value)
        : checked.value,
      [`${prefix.value}__input-indeterminate`]: indeterminate.value
    })
  })

  onMounted(() => {
    if (globalCtx) globalCtx.initTotalList(modelValue.value)
  })

  const handleCheckedChange = () => {
    if (disabled.value) return
    if (globalCtx && !globalCtx.getDisabledList().includes(modelValue.value)) {
      globalCtx.updateCheckedList(modelValue.value)
    } else {
      emit('update:checked', !checked.value)
    }
  }
  const handleLabelClick = () => {
    if (disabled.value) return
    if (globalCtx && !globalCtx.getDisabledList().includes(modelValue.value)) {
      globalCtx.updateCheckedList(modelValue.value)
    } else {
      emit('update:checked', !checked.value)
    }
  }
</script>

<style lang="less">
  @import './index.less';
</style>
