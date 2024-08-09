<template>
  <div :class="`${prefixCls}-body`">
    <div v-for="(row, rowIndex) in rows" :key="rowIndex" :class="`${prefixCls}-body-row`">
      <div v-for="(cell, colIndex) in row" :key="colIndex" :class="`${prefixCls}-date`">
        <div :class="`${prefixCls}-date-value`">{{ cell.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { PropType } from 'vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';


const props = defineProps({
  prefixCls: {
    type: String,
    required: true
  },
  headerValue: {
    type: Object as PropType<Dayjs>,
    required: true
  }
})
const { headerValue } = toRefs(props)

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
  'December',
]

// 将月份拆成 四行三列 的数组
const rows = computed(() => {
  const year = headerValue.value.year()

  const flatData = new Array(CELL_COUNT).fill(0).map((_, index) => ({
    label: MONTH_LIST[index],
    value: dayjs(`${year}-${index + 1}`, 'YYYY-M')
  }))

  const rows = new Array(ROW_COUNT).fill(0).map((_, index) => (
    flatData.slice(index * COL_COUNT, (index + 1) * COL_COUNT)
  ))
  console.log('a', rows)

  return rows
})

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
      // background-color: #F5F5F5;
    }
  }
}
</style>