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
      name="ml-selected"
      :size="16"
      :color="themeColors['--primary-color-7']"
    />
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, inject, onMounted } from 'vue'
  import { useTheme } from '@meleon/uni-ui/hooks'
  import { cs } from '@meleon/uni-ui/utils'
  import { MlSelectGroupInjectionKey } from './context'
  import type { OptionProps } from './index.interface'
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
    },
    isExtra: {
      type: Boolean,
      default: false
    }
  })
  const { label, value, disabled, isExtra } = toRefs(props)
  // const emit = defineEmits([])
  const { themeColors } = useTheme()

  const prefix = ref('ml-option')
  const className = computed(() => {
    return cs(prefix.value, {
      [`${prefix.value}-active`]: isOptionActive.value
    })
  })

  const isOptionActive = computed(() => {
    return (
      globalCtxWithDefaults.value.selectedOptions.findIndex(
        (item) => item.value === value.value
      ) !== -1
    )
  })

  // OptionProps 从 props 中收集的参数信息
  const optionProps = computed(() => {
    return {
      label: label.value,
      value: value.value,
      disabled: disabled.value,
      isExtra: isExtra.value
    } as OptionProps
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
