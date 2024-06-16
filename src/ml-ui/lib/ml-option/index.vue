<template>
  <view
    v-if="!globalCtxWithDefaults.isHidden"
    :class="className"
    :style="{ width: `${globalCtxWithDefaults.optionRefWidth}px`, ...themeColors }"
    @click="onOptionClick"
  >
    <text>{{ label }}</text>
    <MlIcon
      v-if="isOptionActive"
      class="ml-icon"
      icon="ml-selected"
      :size="16"
      :color="themeColors['--primary-color-7']"
    />
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, inject, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import type { MlOptionProps } from './type'
  import { MlSelectGroupInjectionKey } from './context'
  import useTheme from '../../hooks/useTheme/useTheme'
  import { cs } from '../../utils/property'
  import MlIcon from '../ml-icon/index.vue'

  const props = defineProps({
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })
  const { label, value, disabled } = toRefs(props)
  // const emit = defineEmits([])
  const { themeColors } = useTheme()

  const prefix = 'ml-option'
  const className = computed(() => {
    return cs(prefix, {
      [`${prefix}-active`]: isOptionActive.value
    })
  })

  const isOptionActive = computed(() => {
    return (
      globalCtxWithDefaults.value.selectedOptions.findIndex(
        (item) => item.value === value.value
      ) !== -1
    )
  })

  // MlOptionProps 从 props 中收集的参数信息
  const optionProps = computed(() => {
    return {
      label: label.value,
      value: value.value,
      disabled: disabled.value
    } as MlOptionProps
  })

  const globalCtx = inject(MlSelectGroupInjectionKey)
  onMounted(() => {
    if (globalCtx) {
      globalCtx.addOption(optionProps.value)
    }
  })

  // 为 globalCtx 提供的变量设置默认值
  const globalCtxWithDefaults = computed(() => {
    return {
      optionRefWidth: globalCtx ? globalCtx.getTriggerRect().width : 100,
      selectedOptions: globalCtx ? globalCtx.getSelectedList() : [],
      isHidden: globalCtx ? globalCtx.getHiddenList().includes(value.value) : false
    }
  })

  const onOptionClick = () => {
    if (globalCtx) globalCtx.selectOption(optionProps.value)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
