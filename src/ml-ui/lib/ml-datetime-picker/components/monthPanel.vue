<template>
  <view :class="`${prefixCls}-body`">
    <view v-for="(row, rowIndex) in rows" :key="rowIndex" :class="`${prefixCls}-body-row`">
      <view
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        :class="{
          [`${prefixCls}-date`]: true,
          [`${prefixCls}-date--active`]: isActiveCell(cell)
        }"
        @click="() => onCellClick(cell)"
      >
        <view :class="`${prefixCls}-date-value`">{{ cell.label }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { computed, toRefs, inject } from 'vue'
  import type { PropType } from 'vue'
  import dayjs from 'dayjs'
  import type { Dayjs } from 'dayjs'
  import { DatetimePickerContextKey } from '../context'
  import type { DatetimePickerCell } from '../index.interface'

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
    }
  })
  const { headerValue } = toRefs(props)

  const emit = defineEmits(['cell-click'])

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

    const flatData = new Array(CELL_COUNT).fill(0).map((_, index) => ({
      label: datetimePickerCtx
        ? datetimePickerCtx.datePickerT(`calendar.month.long.${MONTH_LIST[index]}`)
        : MONTH_LIST[index],
      value: dayjs(`${year}-${index + 1}`, 'YYYY-M')
    }))

    const rows = new Array(ROW_COUNT)
      .fill(0)
      .map((_, index) => flatData.slice(index * COL_COUNT, (index + 1) * COL_COUNT))

    return rows
  })

  const isActiveCell = (cell: DatetimePickerCell) => {
    return cell.value.isSame(headerValue.value, 'month')
  }

  const onCellClick = (cell: DatetimePickerCell) => {
    emit('cell-click', cell.value)
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
      @{prefix}-date {
        flex: 1;
        padding: 8px 12px;
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
</style>
