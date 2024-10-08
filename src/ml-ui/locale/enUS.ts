const calendarLang: MeleonLocale.CalendarLang = {
  formatYear: 'YYYY',
  formatMonth: 'MMM YYYY',
  today: 'Today',
  view: {
    month: 'Month',
    year: 'Year',
    week: 'Week',
    day: 'Day'
  },
  month: {
    long: {
      January: 'January',
      February: 'February',
      March: 'March',
      April: 'April',
      May: 'May',
      June: 'June',
      July: 'July',
      August: 'August',
      September: 'September',
      October: 'October',
      November: 'November',
      December: 'December'
    },
    short: {
      January: 'Jan',
      February: 'Feb',
      March: 'Mar',
      April: 'Apr',
      May: 'May',
      June: 'Jun',
      July: 'Jul',
      August: 'Aug',
      September: 'Sept',
      October: 'Oct',
      November: 'Nov',
      December: 'Dec'
    }
  },
  week: {
    long: {
      self: 'Week',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday'
    },
    short: {
      self: 'Week',
      monday: 'Mon',
      tuesday: 'Tue',
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun'
    }
  }
}

const defaultTypeTemplate = '#{field} is not a #{type} type'
const formLang: MeleonLocale.FormLang = {
  validateMessages: {
    required: '#{field} is required',
    type: {
      string: defaultTypeTemplate,
      number: defaultTypeTemplate,
      array: defaultTypeTemplate,
      object: defaultTypeTemplate,
      boolean: defaultTypeTemplate
    },
    array: {
      length: '#{field} must be exactly #{length} in length',
      minLength: '#{field} cannot be less than #{minLength} in length',
      maxLength: '#{field} cannot be greater than #{maxLength} in length',
      includes: '#{field} is not includes #{includes}',
      deepEqual: '#{field} is not deep equal with #{deepEqual}',
      empty: '#{field} is not an empty array'
    }
  }
}

const enUS: MeleonLocale.CoreLocale = {
  locale: 'en-US',
  calendar: calendarLang,
  form: formLang,
  input: {
    placeholder: 'please input'
  },
  select: {
    placeholder: 'please select'
  }
}

export default enUS
