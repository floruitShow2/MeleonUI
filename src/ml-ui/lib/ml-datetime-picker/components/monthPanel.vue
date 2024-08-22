<template>
  <view :class="`${prefixCls}-body`">
    <view
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      :class="`${prefixCls}-body-row`"
    >
      <view
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        :class="localGetCellClassName(cell)"
        @click="() => onCellClick(cell)"
      >
        <view :class="`${prefixCls}-date-value`">{{ cell.label }}</view>
      </view>
    </view>
    <!-- :class="{
          [`${prefixCls}-date`]: true,
          [`${prefixCls}-date--active`]: isActiveCell(cell)
        }" -->
  </view>
</template>

<script setup lang="ts">
  import { reactive, toRefs, computed, inject } from 'vue'
  import type { PropType } from 'vue'
  import dayjs from 'dayjs'
  import type { Dayjs } from 'dayjs'
  import { usePickerCellClassName } from '@meleon/uni-ui/hooks'
  import { isFunction, getDateValue } from '@meleon/uni-ui/utils'
  import { DatetimePickerContextKey } from '../context'
  import type {
    DatetimePickerCell,
    DisabledDateFunc,
    IsSameTimeFunc
  } from '../index.interface'

  const props = defineProps({
    prefixCls: {
      type: String,
      required: true
    },
    value: {
      type: Object as PropType<Dayjs>
    },
    headerValue: {
      type: Object as PropType<Dayjs>,
      required: true
    },
    disabledDate: {
      type: Function as PropType<DisabledDateFunc>
    }
  })
  const {
    prefixCls,
    value: modelValue,
    headerValue,
    disabledDate
  } = toRefs(props)

  const emit = defineEmits(['cell-click', 'select'])

  const datetimePickerCtx = inject(DatetimePickerContextKey, null)

  const CELL_COUNT = 12
  const ROW_COUNT = 4
  const COL_COUNT = 3

  const MONTH_LIST = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  // 将月份拆成 四行三列 的数组
  const rows = computed(() => {
    const year = headerValue.value.year()

    const flatData: DatetimePickerCell[] = new Array(CELL_COUNT)
      .fill(0)
      .map((_, index) => ({
        label: datetimePickerCtx
          ? datetimePickerCtx.datePickerT(
              `calendar.month.long.${MONTH_LIST[index]}`
            )
          : MONTH_LIST[index],
        value: dayjs(`${year}-${index + 1}`, 'YYYY-M'),
        className: `${prefixCls.value}-panel-month`
      }))

    const rows = new Array(ROW_COUNT)
      .fill(0)
      .map((_, index) =>
        flatData.slice(index * COL_COUNT, (index + 1) * COL_COUNT)
      )

    return rows
  })

  const isSameTime: IsSameTimeFunc = (current, target) =>
    current.isSame(target, 'month')
  const { getCellClassName } = usePickerCellClassName(
    reactive({
      prefixCls,
      value: modelValue,
      mode: 'month',
      isSameTime
    })
  )
  const isCellDisabled = (cell: DatetimePickerCell): boolean => {
    return !!(
      isFunction(disabledDate?.value) &&
      disabledDate?.value(getDateValue(cell.value))
    )
  }
  const localGetCellClassName = (cell: DatetimePickerCell) => {
    const isDisabled = isCellDisabled(cell)
    return getCellClassName(cell, isDisabled)
  }

  const onCellClick = (cell: DatetimePickerCell) => {
    emit('cell-click', cell.value)
    // emit('select', cell.value)
  }
</script>

<style scoped lang="less">
  @prefix: ~'.ml-datetime-picker';

  @{prefix}-body {
    width: 100%;
    height: 100%;
    gap: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    &-row {
      width: 100%;
      gap: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      @{prefix}-panel-month {
        padding: 8px 12px;
        background-color: var(--info-color-1);
      }
      @{prefix}-panel-month@{prefix}-cell-selected {
        background-color: var(--primary-color-1);
        &::after {
          display: none;
        }
      }
    }
  }
</style>
