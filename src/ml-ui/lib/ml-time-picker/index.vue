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
      :show-footer="true"
      @close="closePicker"
    >
      <template #header></template>
      <template #default>
        <view :class="`${prefix}--content`">
          <TimeColumn
            v-if="showPicker && (columns.includes('H') || columns.includes('h'))"
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
      <template #footer>
        <view :class="`${prefix}--footer`">
          <MlButton type="secondary" size="small">此刻</MlButton>
        </view>
      </template>
    </Drawer>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive, toRefs, computed, watch, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import dayjs from 'dayjs'
  import customParseFormat from 'dayjs/plugin/customParseFormat'
  import type { Dayjs } from 'dayjs'
  import { useState, useTheme, useTimeFormat, useTimeList } from '@meleon/uni-ui/hooks'
  import { cs, formatDateValue, generateDeviceUI, getReturnValue } from '@meleon/uni-ui/utils'
  import Drawer from '../ml-drawer/index.vue'
  import MlButton from '../ml-button/index.vue'
  import TimeColumn from './components/timeColumn.vue'
  import { TimeColumnEnum, type TimeListItem } from './index.interface'
  import type { TimePickerProps } from './index.interface'

  dayjs.extend(customParseFormat)

  const props = defineProps({
    modelValue: {
      type: [String, Object] as PropType<TimePickerProps['modelValue']>,
      required: true
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
  const { modelValue, step, format } = toRefs(props)

  const emit = defineEmits(['update:modelValue', 'select'])

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
  const columnWidth = computed(() => {
    const { screenWidth } = generateDeviceUI().ui
    return (screenWidth - 20) / columns.value.length
  })

  const [selectedValue, setSelectedValue] = useState<Dayjs | undefined>()
  watch(
    [modelValue, showPicker],
    () => {
      if (!showPicker.value) return
      console.log('value change', formatDateValue(modelValue.value, format.value))
      setSelectedValue(formatDateValue(modelValue.value, format.value))
    },
    { immediate: true }
  )

  const selectedHour = computed(() => selectedValue.value?.hour())
  const selectedMinute = computed(() => selectedValue.value?.minute())
  const selectedSecond = computed(() => selectedValue.value?.second())

  const { hours, minutes, seconds } = useTimeList(
    reactive({
      step,
      selectedHour,
      selectedMinute,
      selectedSecond
    })
  )

  const emitSelect = (value: Dayjs) => {
    setSelectedValue(value)
    const returnValue = getReturnValue(value, computedFormat.value)
    console.log(value, returnValue)
    emit('update:modelValue', returnValue)
    emit('select', returnValue)
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
  const closePicker = () => {}
</script>

<style lang="less">
  @import './index.less';
</style>
