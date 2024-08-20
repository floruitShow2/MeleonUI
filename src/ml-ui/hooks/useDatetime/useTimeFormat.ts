import { convertFormat2Columns } from '@meleon/uni-ui/utils'
import { computed, toRefs } from 'vue'

interface TimeFormatProps {
  format?: string
  use12Hours?: boolean
}

export default function useTimeFormat(props: TimeFormatProps) {
  const { format: propFormat, use12Hours: propUse12Hours } = toRefs(props)

  const format = computed(() => {
    if (!propFormat?.value || !convertFormat2Columns(propFormat.value).list.length) {
      return propUse12Hours?.value ? 'hh:mm:ss a' : 'HH:mm:ss'
    }
    return propFormat.value
  })

  const config = computed(() => convertFormat2Columns(format.value))
  const localColumns = computed(() => config.value.list)
  const localUse12Hours = computed(() => {
    return !!(propUse12Hours?.value || config.value.use12Hours)
  })

  return {
    columns: localColumns,
    use12Hours: localUse12Hours,
    format
  }
}
