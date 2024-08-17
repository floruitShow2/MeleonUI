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
            v-if="columns.includes('H') || columns.includes('h')"
            :prefix-cls="prefix"
            :list="hours"
            :class="`${prefix}--content-column`"
          />
          <TimeColumn
            v-if="columns.includes('m')"
            :prefix-cls="prefix"
            :list="minutes"
            :class="`${prefix}--content-column`"
          />
          <TimeColumn
            v-if="columns.includes('s')"
            :prefix-cls="prefix"
            :list="seconds"
            :class="`${prefix}--content-column`"
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
  import { ref, reactive, toRefs, computed, watch } from 'vue'
  import type { PropType } from 'vue'
  import type { Dayjs } from 'dayjs'
  import { useState, useTheme, useTimeFormat, useTimeList } from '@meleon/uni-ui/hooks'
  import { cs, formatDateValue } from '@meleon/uni-ui/utils'
  import Drawer from '../ml-drawer/index.vue'
  import MlButton from '../ml-button/index.vue'
  import TimeColumn from './components/timeColumn.vue'
  import type { TimePickerProps } from './index.interface'

  const props = defineProps({
    modelValue: {
      type: Object as PropType<TimePickerProps['modelValue']>,
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

  const emit = defineEmits([])

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

  const [selectedValue, setSelectedValue] = useState<Dayjs | undefined>()
  watch([modelValue, showPicker], () => {
    if (!showPicker.value) return
    setSelectedValue(formatDateValue(modelValue.value, format.value))
  })

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

  const openPicker = () => {
    showPicker.value = true
  }
  const closePicker = () => {}
</script>

<style lang="less">
  @import './index.less';
</style>
