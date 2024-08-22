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
  import { ref, toRefs, computed, watchEffect } from 'vue'
  import type { PropType } from 'vue'
  import dayjs from 'dayjs'
  import type { Dayjs } from 'dayjs'
  import type { DatetimePickerCell } from '../index.interface'

  const ROW_COUNT = 4
  const COL_COUNT = 3
  const CELL_COUNT = ROW_COUNT * COL_COUNT
  const SPAN = 10

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

  const emit = defineEmits(['cell-click', 'header-title-change'])

  const rows = computed(() => {
    const startYear = Math.floor(headerValue.value.year() / SPAN) * SPAN - 1
    const flatData: DatetimePickerCell[] = new Array(CELL_COUNT)
      .fill(0)
      .map((_, index) => ({
        label: `${startYear + index}`,
        value: dayjs(`${startYear + index}`, 'YYYY'),
        isPrev: index < 1,
        isNext: index > SPAN
      }))

    const rows = new Array(ROW_COUNT)
      .fill(0)
      .map((_, index) =>
        flatData.slice(index * COL_COUNT, (index + 1) * COL_COUNT)
      )

    return rows
  })

  watchEffect(() => {
    const headerTitle = `${rows.value[0][1].label}-${rows.value[ROW_COUNT - 1][COL_COUNT - 1].label}`
    emit('header-title-change', headerTitle)
  })

  const isActiveCell = (cell: DatetimePickerCell) => {
    return cell.value.isSame(headerValue.value, 'year')
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
