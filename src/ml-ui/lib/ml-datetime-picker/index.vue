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
          :mode="headerMode"
          :value="headerValue"
          :title="localHeaderTitle"
          :on-label-click="onLabelClick"
          :style="{
            width: '100%',
            height: '100%'
          }"
        />
      </template>
      <template #default>
        <DateYearPanel
          v-if="headerMode === 'year'"
          :prefix-cls="prefix"
          :header-value="headerValue"
          @cell-click="onCellClick"
          @header-title-change="onHeaderTitleChange"
        />
        <DateMonthPanel
          v-else-if="headerMode === 'month'"
          :prefix-cls="prefix"
          :header-value="headerValue"
          @cell-click="onCellClick"
        />
        <DatePanel v-else :prefix-cls="prefix" :mode="headerMode" :header-value="headerValue" />
      </template>
    </Drawer>
  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, computed, watch, provide } from 'vue'
  import type { PropType } from 'vue'
  import type { Dayjs } from 'dayjs'
  import { usePickerHeader, useTheme, useState, usePickerTransform } from '@meleon/uni-ui/hooks'
  import { cs, getReturnValue } from '@meleon/uni-ui/utils'
  import Drawer from '../ml-drawer/index.vue'
  import DatePickerHeader from './components/header.vue'
  import DateYearPanel from './components/yearPanel.vue'
  import DateMonthPanel from './components/monthPanel.vue'
  import DatePanel from './components/datePanel.vue'
  import { DatetimePickerContextKey } from './context'
  import type { DatetimePickerProps } from './index.interface'

  const props = defineProps({
    modelValue: {
      type: [String, Object] as PropType<DatetimePickerProps['modelValue']>,
      default: ''
    },
    defaultModelValue: {
      type: String as PropType<DatetimePickerProps['defaultModelValue']>,
      default: ''
    },
    mode: {
      type: String as PropType<DatetimePickerProps['mode']>,
      default: 'date'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  })
  const { modelValue, defaultModelValue, mode, format } = toRefs(props)

  const emit = defineEmits(['update:modelValue', 'change'])

  const { themeColors } = useTheme()

  const datePickerT = usePickerTransform({})
  provide(DatetimePickerContextKey, {
    datePickerT
  })

  const prefix = ref('ml-datetime-picker')
  const className = computed(() => {
    return cs(prefix.value, `${prefix.value}--${mode.value}`)
  })

  const localModelValue = computed(() => {})

  const [headerMode, setHeaderMode] = useState(mode.value)
  watch(
    () => props.mode,
    (newVal) => {
      console.log(newVal, headerMode.value)
    },
    { immediate: true }
  )

  const { headerValue, setHeaderValue, headerOperations } = usePickerHeader({
    mode: headerMode,
    modelValue,
    defaultModelValue,
    format,
    onChange(newVal: Dayjs) {
      const returnValue = getReturnValue(newVal)
      emit('update:modelValue', returnValue)
      emit('change', returnValue)
    }
  })

  const [localHeaderTitle, setLocalHeaderTitle] = useState<string | undefined>()
  const onHeaderTitleChange = (newTitle: string) => {
    setLocalHeaderTitle(newTitle)
  }

  const onLabelClick = (type: 'year' | 'month') => {
    setHeaderMode(type)
  }
  const onCellClick = (date: Dayjs) => {
    let newVal = headerValue.value
    newVal = newVal.set('year', date.year())
    if (headerMode.value === 'month') {
      newVal = newVal.set('month', date.month())
    }
    setHeaderValue(newVal)

    if (headerMode.value === 'year') {
      // setHeaderMode(headerMode.value === 'year' ? 'month' : 'date')
      setHeaderMode('month')
    }
  }

  const showPicker = ref(false)
  const openPicker = () => {
    showPicker.value = true
    console.log(headerMode.value)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
