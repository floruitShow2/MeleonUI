<template>
  <view :class="className" :style="themeColors">
    <view :class="`${prefix}--trigger`" @click="openPicker">
      <slot name="trigger">
        <MlInput readonly :model-value="triggerValue">
          <template #suffix>
            <MlIcon name="ml-calendar" />
          </template>
        </MlInput>
      </slot>
    </view>
    <MlDrawer
      v-model:visible="showPicker"
      placement="bottom"
      :height="500"
      :radius="10"
      :show-close="false"
      :show-footer="false"
      @close="closePicker"
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
          :value="panelValue"
          :header-value="headerValue"
          @cell-click="onCellClick"
          @header-title-change="onHeaderTitleChange"
        />
        <DateMonthPanel
          v-else-if="headerMode === 'month'"
          :prefix-cls="prefix"
          :value="panelValue"
          :header-value="headerValue"
          @cell-click="onCellClick"
        />
        <DatePanel
          v-else
          :prefix-cls="prefix"
          :mode="headerMode"
          :is-same-time="isSameTime"
          :disabled-date="disabledDate"
          :value="panelValue"
          :header-value="headerValue"
          @select="onDateSelect"
        />
      </template>
    </MlDrawer>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, computed, provide } from 'vue'
  import type { PropType } from 'vue'
  import type { Dayjs } from 'dayjs'
  import {
    usePickerHeader,
    useTheme,
    useState,
    usePickerTransform,
    usePickerState,
    useFormItem
  } from '@meleon/uni-ui/hooks'
  import {
    cs,
    getReturnValue,
    isDateValueChange,
    convertDayjs2FormatValue
  } from '@meleon/uni-ui/utils'
  import MlIcon from '../ml-icon/index.vue'
  import MlInput from '../ml-input/index.vue'
  import MlDrawer from '../ml-drawer/index.vue'
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
    pickerValue: {
      type: [String, Object] as PropType<DatetimePickerProps['modelValue']>,
      default: ''
    },
    defaultPickerValue: {
      type: String as PropType<DatetimePickerProps['defaultModelValue']>,
      default: ''
    },
    locale: {
      type: Object as PropType<DatetimePickerProps['locale']>,
      default: () => ({})
    },
    mode: {
      type: String as PropType<DatetimePickerProps['mode']>,
      default: 'month'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    isSameTime: {
      type: Function as PropType<DatetimePickerProps['isSameTime']>
    },
    disabledDate: {
      type: Function as PropType<DatetimePickerProps['disabledDate']>
    }
  })
  const {
    modelValue,
    defaultModelValue,
    pickerValue,
    defaultPickerValue,
    locale,
    mode,
    format
  } = toRefs(props)

  const emit = defineEmits([
    'update:modelValue',
    'change',
    'update:pickerValue'
  ])

  const { themeColors } = useTheme()
  const { eventsHanlders, disabled } = useFormItem({ disabled: props.disabled })

  // locale 转换方法注入
  const datePickerT = usePickerTransform(reactive({ locale }))
  provide(DatetimePickerContextKey, {
    datePickerT
  })

  const prefix = ref('ml-datetime-picker')
  const className = computed(() => {
    return cs(prefix.value, `${prefix.value}--${mode.value}`)
  })

  const [selectedValue, setSelectedValue] = usePickerState(
    reactive({
      modelValue,
      defaultValue: defaultModelValue,
      format
    })
  )
  const [processValue, setProcessValue] = useState<Dayjs | undefined>()
  const panelValue = computed(() => {
    return processValue.value ?? selectedValue.value
  })
  const triggerValue = computed(() => {
    if (panelValue.value) {
      return convertDayjs2FormatValue(panelValue.value, format.value)
    } else {
      return ''
    }
  })

  /**
   * @description 选中事件，仅修改面板展示的时间数据，不触发双向绑定更新
   */
  function select(value: Dayjs | undefined) {
    setProcessValue(value)
  }
  const emitChange = (value: Dayjs | undefined) => {
    const returnValue = value ? getReturnValue(value) : undefined
    if (isDateValueChange(value, selectedValue.value)) {
      emit('update:modelValue', returnValue)
      emit('change', returnValue)
      eventsHanlders.value.onChange?.()
    }
  }
  /**
   * @description 确认事件，基本只会在面板关闭前调用，触发双向绑定更新
   */
  function confirm(value: Dayjs | undefined) {
    emitChange(value)
    setSelectedValue(value)
    setProcessValue(undefined)
  }

  const [headerMode, setHeaderMode] = useState<
    DatetimePickerProps['mode'] | undefined
  >(mode.value)

  const { headerValue, setHeaderValue, headerOperations } = usePickerHeader(
    reactive({
      mode: headerMode.value,
      pickerValue: pickerValue.value,
      defaultPickerValue: defaultPickerValue.value,
      selectedValue: selectedValue.value,
      format: format.value,
      onChange(newVal: Dayjs) {
        const returnValue = getReturnValue(newVal)
        emit('update:pickerValue', returnValue)
      }
    })
  )

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

    // if (headerMode.value === 'year') {
    //   setHeaderMode('month')
    // }
    if (headerMode.value === 'year' && mode.value !== 'year') {
      setHeaderMode('month')
    } else if (headerMode.value === 'month' && mode.value !== 'month') {
      setHeaderMode('date')
    }

    // 更新下 面板展示的时间
    select(date)
  }
  const onDateSelect = (newVal: Dayjs) => {
    select(newVal)
  }

  const showPicker = ref(false)
  const openPicker = () => {
    showPicker.value = true
  }
  const closePicker = () => {
    confirm(panelValue.value)
  }
</script>

<style lang="less">
  @import './index.less';
</style>
