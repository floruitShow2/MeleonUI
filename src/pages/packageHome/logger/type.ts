type LogRecordType = 'feature' | 'optimize' | 'bugFix' | 'style'

interface LogRecordInstanceType {
  label: string
  link: string
}

export interface LogInstanceType {
  version: string
  date: Date | string | number
  content: Record<LogRecordType, LogRecordInstanceType[]>
}
