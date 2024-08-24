const calendarLang: MeleonLocale.CalendarLang = {
  formatYear: 'YYYY 年',
  formatMonth: 'YYYY 年 MM 月',
  today: '今天',
  view: {
    month: '月',
    year: '年',
    week: '周',
    day: '日'
  },
  month: {
    long: {
      January: '一月',
      February: '二月',
      March: '三月',
      April: '四月',
      May: '五月',
      June: '六月',
      July: '七月',
      August: '八月',
      September: '九月',
      October: '十月',
      November: '十一月',
      December: '十二月'
    },
    short: {
      January: '一月',
      February: '二月',
      March: '三月',
      April: '四月',
      May: '五月',
      June: '六月',
      July: '七月',
      August: '八月',
      September: '九月',
      October: '十月',
      November: '十一月',
      December: '十二月'
    }
  },
  week: {
    long: {
      self: '周',
      monday: '周一',
      tuesday: '周二',
      wednesday: '周三',
      thursday: '周四',
      friday: '周五',
      saturday: '周六',
      sunday: '周日'
    },
    short: {
      self: '周',
      monday: '一',
      tuesday: '二',
      wednesday: '三',
      thursday: '四',
      friday: '五',
      saturday: '六',
      sunday: '日'
    }
  }
}

const zhCN: MeleonLocale.CoreLocale = {
  locale: 'zh-CN',
  calendar: calendarLang,
  input: {
    placeholder: '请输入'
  },
  select: {
    placeholder: '请选择'
  }
}

export default zhCN
