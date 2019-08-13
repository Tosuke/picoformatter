export type DateFormatter = (date: Date) => string

export function format(strings: TemplateStringsArray, ...values: Array<string | DateFormatter>): DateFormatter {
  return date => {
    let result = ''
    for (let i = 0; i < values.length; i++) {
      result += strings[i]
      const value = values[i]
      if (typeof value === 'string') {
        result += value
      } else {
        result += value(date)
      }
    }
    result += strings[strings.length - 1]
    return result
  }
}

// 0方向丸め
const fix = (num: number) => num > 0 ? Math.floor(num) : Math.ceil(num)

const SECOND_MS = 1000
const MINUTE_MS = 60 * SECOND_MS
const HOUR_MS = 60 * MINUTE_MS
const DAY_MS = 24 * HOUR_MS
const WEEK_MS = 7 * DAY_MS

export function formatRelativeTime(
  formatters: Partial<{
    year: (yearDiff: number, left: Date, right: Date) => string
    month: (monthDiff: number, left: Date, right: Date) => string
    week: (weekDiff: number, left: Date, right: Date) => string
    date: (dateDiff: number, left: Date, right: Date) => string
    hours: (hoursDiff: number, left: Date, right: Date) => string
    minutes: (minutesDiff: number, left: Date, right: Date) => string
    seconds: (secondsDiff: number, left: Date, right: Date) => string
  }>,
  left: Date,
  right: Date,
): string {
  const diff = left.getTime() - right.getTime()
  if(Math.abs(diff) >= DAY_MS * 31) {
    const yearDiff = left.getFullYear() - right.getFullYear()
    if(Math.abs(yearDiff) > 0 && formatters.year) {
      return formatters.year(yearDiff, left, right)
    } else if(formatters.month) {
      return formatters.month((left.getMonth() - right.getMonth()) + yearDiff * 12, left, right)
    }
  } else if(Math.abs(diff) >= WEEK_MS && formatters.week) {
    return formatters.week(fix(diff / WEEK_MS), left, right)
  } else if(Math.abs(diff) >= DAY_MS && formatters.date) {
    return formatters.date(fix(diff / DAY_MS),left, right)
  } else if(Math.abs(diff) >= HOUR_MS && formatters.hours) {
    return formatters.hours(fix(diff / HOUR_MS), left, right)
  } else if(Math.abs(diff) >= MINUTE_MS && formatters.minutes) {
    return formatters.minutes(fix(diff / MINUTE_MS), left, right)
  } else if(formatters.seconds) {
    return formatters.seconds(fix(diff / SECOND_MS), left, right)
  } else {
    return `${diff}ms`
  }
  throw 'unreachable'
}

function padZero(num: number, maxLength: number) {
  return `${num}`.padStart(maxLength, '0')
}

export const yyyy: DateFormatter = date => padZero(date.getFullYear(), 4)

export const MM: DateFormatter = date => padZero(date.getMonth() + 1, 2)

export const dd: DateFormatter = date => padZero(date.getDate(), 2)

export const HH: DateFormatter = date => padZero(date.getHours(), 2)

export const mm: DateFormatter = date => padZero(date.getMinutes(), 2)

export const ss: DateFormatter = date => padZero(date.getSeconds(), 2)
