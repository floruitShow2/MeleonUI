declare namespace MeleonLocale {
  type LocaleCategory = 'zh-CN' | 'en-US'

  interface CalendarLang {
    formatYear: string
    formatMonth: string
    today: string
    view: {
      month: string
      year: string
      week: string
      day: string
    }
    month: {
      long: {
        January: string
        February: string
        March: string
        April: string
        May: string
        June: string
        July: string
        August: string
        September: string
        October: string
        November: string
        December: string
      }
      short: {
        January: string
        February: string
        March: string
        April: string
        May: string
        June: string
        July: string
        August: string
        September: string
        October: string
        November: string
        December: string
      }
    }
    week: {
      long: {
        self: string
        monday: string
        tuesday: string
        wednesday: string
        thursday: string
        friday: string
        saturday: string
        sunday: string
      }
      short: {
        self: string
        monday: string
        tuesday: string
        wednesday: string
        thursday: string
        friday: string
        saturday: string
        sunday: string
      }
    }
  }

  interface CoreLocale {
    locale: LocaleCategory
    input: {
      placeholder: string
    }
    select: {
      placeholder: string
    }
    calendar: CalendarLang
  }
}
