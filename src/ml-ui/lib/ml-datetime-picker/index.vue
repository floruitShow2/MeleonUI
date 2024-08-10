<template>
  <view :class="className" :style="themeColors">
    <view :class="`${prefix}--trigger`" @click="openPicker">
      <slot name="trigger" />
    </view>
    <Drawer
      v-model:visible="showPicker"
      placement="bottom"
      :height="500"
      :radius="10"
      :show-close="false"
      :show-footer="false"
    >
      <template #title>
        <DatePickerHeader
          v-bind="{ ...headerOperations }"
          :prefix-cls="prefix"
          mode="month"
          :value="headerValue"
          :on-label-click="onLabelClick"
          :style="{
            width: '100%',
            height: '100%'
          }"
        />
      </template>
      <template #default>
        <DateMonthPanel :prefix-cls="prefix" :header-value="headerValue" />
      </template>
    </Drawer>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import type { Dayjs } from 'dayjs'
  import { usePickerHeader, useTheme } from '@meleon/uni-ui/hooks'
  import { cs, getReturnValue } from '@meleon/uni-ui/utils'
  import DatePickerHeader from './components/header.vue'
  import DateMonthPanel from './components/monthPanel.vue'
  import Drawer from '../ml-drawer/index.vue'

  import type { DatetimePickerProps } from './index.interface'

  const props = defineProps({
    modelValue: {
      type: String as PropType<DatetimePickerProps['modelValue']>,
      default: ''
    },
    defaultModelValue: {
      type: String as PropType<DatetimePickerProps['defaultModelValue']>,
      default: ''
    },
    mode: {
      type: String as PropType<DatetimePickerProps['mode']>,
      default: 'month'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  })
  const { modelValue, defaultModelValue, mode, format } = toRefs(props)

  const emit = defineEmits(['update:modelValue', 'change'])

  const { themeColors } = useTheme()

  const prefix = ref('ml-datetime-picker')
  const className = computed(() => {
    return cs(prefix.value, `${prefix.value}--${mode.value}`)
  })

  const localModelValue = computed(() => {})

  const { headerValue, setHeaderValue, headerOperations } = usePickerHeader({
    mode,
    modelValue,
    defaultModelValue,
    format,
    onChange(newVal: Dayjs) {
      const returnValue = getReturnValue(newVal)
      emit('update:modelValue', returnValue)
    }
  })

  console.log(headerOperations)
  const onLabelClick = () => {
    console.log('aaa')
  }

  const showPicker = ref(false)
  const openPicker = () => {
    showPicker.value = true
  }
</script>

<style lang="less">
  @import './index.less';
</style>
