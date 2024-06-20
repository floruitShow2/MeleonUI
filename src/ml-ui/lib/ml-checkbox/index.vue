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
  import { toRefs, computed, inject, onMounted } from 'vue'
  import { useTheme, cs } from '@meleon/uni-ui/index'
  import { checkboxGroupInjectionKey } from '../ml-checkbox-group/context'

  const props = defineProps({
    checked: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    value: { type: [String, Number], default: '' }
  })
  const { checked, indeterminate, disabled, value: modelValue } = toRefs(props)

  const emit = defineEmits(['update:checked'])

  const { themeColors } = useTheme()
  
  const globalCtx = inject(checkboxGroupInjectionKey, null)

  const prefix = 'ml-checkbox'

  const className = computed(() => {
    return cs(prefix, {
      [`${prefix}-disabled`]:
        disabled.value ||
        (globalCtx ? globalCtx.getDisabledList().includes(modelValue.value) : false),
      [`${prefix}-underGroup`]: globalCtx !== null
    })
  })
  const inputClassName = computed(() => {
    return cs(`${prefix}__input`, {
      [`${prefix}__input-checked`]: globalCtx
        ? globalCtx.getCheckedList().includes(modelValue.value)
        : checked.value,
      [`${prefix}__input-indeterminate`]: indeterminate.value
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
