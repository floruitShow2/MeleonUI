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
      @close="closePicker"
    >
      <template #title>
        <view :class="`${prefix}--header`">请选择时间</view>
      </template>
      <template #default>
        <view :class="`${prefix}--content`">
          <TimeColumn
            v-if="
              showPicker && (columns.includes('H') || columns.includes('h'))
            "
            :prefix-cls="prefix"
            :value="selectedHour"
            :type="TimeColumnEnum.H"
            :list="hours"
            :width="columnWidth"
            :class="`${prefix}--content-column`"
            @select="(value) => onSelect(value, TimeColumnEnum.H)"
          />
          <TimeColumn
            v-if="showPicker && columns.includes('m')"
            :prefix-cls="prefix"
            :value="selectedMinute"
            :list="minutes"
            :type="TimeColumnEnum.M"
            :width="columnWidth"
            :class="`${prefix}--content-column`"
            @select="(value) => onSelect(value, TimeColumnEnum.M)"
          />
          <TimeColumn
            v-if="showPicker && columns.includes('s')"
            :prefix-cls="prefix"
            :value="selectedSecond"
            :type="TimeColumnEnum.S"
            :list="seconds"
            :width="columnWidth"
            :class="`${prefix}--content-column`"
            @select="(value) => onSelect(value, TimeColumnEnum.S)"
          />
        </view>
      </template>
    </Drawer>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, computed } from 'vue'
  import type { PropType } from 'vue'
  import dayjs from 'dayjs'
  import customParseFormat from 'dayjs/plugin/customParseFormat'
  import type { Dayjs } from 'dayjs'
  import {
    useTheme,
    useTimeFormat,
    useTimeList,
    useTimeState
  } from '@meleon/uni-ui/hooks'
  import {
    cs,
    generateDeviceUI,
    convertDayjs2FormatValue,
    getDateValue,
    isDateValueChange
  } from '@meleon/uni-ui/utils'
  import Drawer from '../ml-drawer/index.vue'
  import TimeColumn from './components/timeColumn.vue'
  import { TimeColumnEnum } from './index.interface'
  import type { TimePickerProps, TimeListItem } from './index.interface'

  dayjs.extend(customParseFormat)

  const props = defineProps({
    modelValue: {
      type: [String, Number, Date, Object] as PropType<
        TimePickerProps['modelValue']
      >,
      required: true
    },
    defaultModelValue: {
      type: [String, Number, Date, Object] as PropType<
        TimePickerProps['defaultModelValue']
      >
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    step: {
      type: Object as PropType<TimePickerProps['step']>,
      default: {}
    }
  })
  const { modelValue, defaultModelValue, step, format } = toRefs(props)

  const emit = defineEmits(['update:modelValue', 'select', 'change'])

  const { themeColors } = useTheme()

  const prefix = ref('ml-time-picker')
  const className = computed(() => {
    return cs(prefix.value)
  })

  const showPicker = ref(false)

  const { columns, format: computedFormat } = useTimeFormat(
    reactive({
      format
    })
  )
  const { localValue, setLocalValue, panelValue, setPanelValue } = useTimeState(
    reactive({
      modelValue,
      defaultModelValue,
      format: computedFormat
    })
  )

  const columnWidth = computed(() => {
    const { screenWidth } = generateDeviceUI().ui
    return (screenWidth - 20) / columns.value.length
  })

  const selectedHour = computed(() => {
    return panelValue.value?.hour()
  })
  const selectedMinute = computed(() => panelValue.value?.minute())
  const selectedSecond = computed(() => panelValue.value?.second())

  const { hours, minutes, seconds } = useTimeList(
    reactive({
      step,
      selectedHour,
      selectedMinute,
      selectedSecond
    })
  )

  const emitSelect = (value: Dayjs) => {
    setPanelValue(value)
    const formattedValue = convertDayjs2FormatValue(value, computedFormat.value)
    const dateValue = getDateValue(value)
    emit('select', formattedValue, dateValue)
  }
  const emitConfirm = () => {
    let newVal = panelValue.value
    if (!newVal) return
    if (isDateValueChange(newVal, localValue.value)) {
      const formattedValue = convertDayjs2FormatValue(
        newVal,
        computedFormat.value
      )
      const dateValue = getDateValue(newVal)
      emit('update:modelValue', formattedValue)
      emit('change', formattedValue, dateValue)
    }
  }

  const onSelect = (value: TimeListItem['value'], type: TimeColumnEnum) => {
    let newValue

    const hour = selectedHour.value || '00'
    const minute = selectedMinute.value || '00'
    const second = selectedSecond.value || '00'

    switch (type) {
      case TimeColumnEnum.H:
        newValue = `${value}:${minute}:${second}`
        break
      case TimeColumnEnum.M:
        newValue = `${hour}:${value}:${second}`
        break
      case TimeColumnEnum.S:
        newValue = `${hour}:${minute}:${value}`
        break
      default:
        newValue = '00:00:00'
    }

    const valueFormat = 'HH:mm:ss'
    newValue = dayjs(newValue, valueFormat)
    emitSelect(newValue)
  }

  const openPicker = () => {
    showPicker.value = true
  }
  const closePicker = () => {
    emitConfirm()
  }
</script>

<style lang="less">
  @import './index.less';
</style>
