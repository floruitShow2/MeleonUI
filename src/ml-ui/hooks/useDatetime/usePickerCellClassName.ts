import type { Dayjs } from 'dayjs'
import { getNow } from '@meleon/uni-ui/utils'
import type { DatetimePickerCell, IsSameTimeFunc } from '@meleon/uni-ui/lib/ml-datetime-picker'

interface PcikerCellClsProps {
  // 选择器前缀
  prefixCls: string
  // 当前选中的时间
  value?: Dayjs
  isSameTime: IsSameTimeFunc
  // 选择器模式
  mode?: MeleonDatetime.DateMode
}

export default function usePickerCellClassName(props: PcikerCellClsProps) {
  const getCellClassName = (cellData: DatetimePickerCell, disabled: boolean = false) => {
    const { value, isSameTime, mode, prefixCls } = props

    const isInView = !cellData.isPrev && !cellData.isNext
    const isSelected = value && isSameTime(cellData.value, value)

    let isToday = isSameTime(cellData.value, getNow())
    if (mode === 'week') {
      isToday = getNow().isSame(cellData.value, 'date')
    }

    return [
      `${prefixCls}-cell`,
      {
        [`${prefixCls}-cell-in-view`]: isInView,
        [`${prefixCls}-cell-today`]: isToday,
        [`${prefixCls}-cell-selected`]: isSelected,
        [`${prefixCls}-cell-disabled`]: disabled
      }
    ]
  }

  return {
    getCellClassName
  }
}
