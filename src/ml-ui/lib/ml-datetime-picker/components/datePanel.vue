<template>
  <view :class="`${prefixCls}-body`">
    <view :class="`${prefixCls}-body-inner`">
      <view :class="`${prefixCls}-body-inner-weeks`">
        <div v-for="key in weekList" :key="key" :class="`${prefixCls}-weeks-item`">
          {{ labelList[key] || '' }}
        </div>
      </view>
      <view :class="`${prefixCls}-body-inner-date`">
        <view v-for="(row, rowIndex) in rows" :key="rowIndex" :class="`${prefixCls}-row`">
          <view
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            :class="{
              [`${prefixCls}-date`]: true
            }"
          >
            <view :class="`${prefixCls}-date-value`">{{ cell.label }}</view>
          </view>
        </view>
      </view>
    </view>
    <view></view>
  </view>
</template>

<script lang="ts" setup>
  import { toRefs, type PropType } from 'vue'
  import type { Dayjs } from 'dayjs'
  import { computed } from 'vue'
  import { methods } from '@meleon/uni-ui/utils'
  import type { DatetimePickerProps, DatetimePickerCell, WeekStart } from '../index.interface'
  import { inject } from 'vue'
  import { DatetimePickerContextKey } from '../context'

  const props = defineProps({
    prefixCls: {
      type: String,
      required: true
    },
    mode: {
      type: String as PropType<DatetimePickerProps['mode']>,
      default: 'month'
    },
    headerValue: {
      type: Object as PropType<Dayjs>,
      required: true
    },
    dayStartOfWeek: {
      type: Number as PropType<WeekStart>,
      default: 0
    }
  })
  const { mode, headerValue, dayStartOfWeek } = toRefs(props)

  const datetimePickerCtx = inject(DatetimePickerContextKey, null)

  const ROW_COUNT = 6
  const COL_COUNT = 7
  const CELL_COUNT = ROW_COUNT * COL_COUNT

  const isWeek = computed(() => {
    return mode.value === 'week'
  })

  const weekList = computed(() => {
    const list = [0, 1, 2, 3, 4, 5, 6]
    const index = Math.max(dayStartOfWeek.value % 7, 0)
    return [...list.slice(index), ...list.slice(0, index)]
  })
  const labelList = computed<string[]>(() => {
    if (!datetimePickerCtx) return []
    return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((i) =>
      datetimePickerCtx.datePickerT(`datePicker.week.short.${i}`)
    )
  })

  const rows = computed(() => {
    const startDate = methods.startOf(headerValue.value, 'month')
    const startDay = startDate.day()

    const days = startDate.daysInMonth()
    const startIndex = weekList.value.indexOf(startDay)
    const flatData: DatetimePickerCell[] = new Array(CELL_COUNT).fill(0).map((_, index) => {
      const value = methods.add(startDate, index - startIndex, 'day')
      return {
        label: `${value.date()}`,
        value,
        isPrev: index < startIndex,
        isNext: index >= startIndex + days - 1
      }
    })

    const rows = new Array(ROW_COUNT).fill(0).map((_, index) => {
      const row = flatData.slice(index * COL_COUNT, (index + 1) * COL_COUNT)

      if (isWeek.value) {
        const valueOfWeek = row[0].value
        row.unshift({
          label: `${valueOfWeek.day()}`,
          value: valueOfWeek
        })
      }

      return row
    })

    return rows
  })
</script>

<style lang="less">
  @prefix: ~'.ml-datetime-picker';

  @{prefix}-body {
    width: 100%;
    height: 100%;
    gap: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    &-inner {
      width: 100%;
      &-date {
        width: 100%;
        @{prefix}-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          @{prefix}-date {
            flex: 1;
            padding: 12px;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: var(--info-color-7);
            background-color: var(--info-color-1);
            &--active {
              color: var(--primary-color-6);
              background-color: var(--primary-color-1);
            }
          }
        }
      }
    }
  }
</style>
