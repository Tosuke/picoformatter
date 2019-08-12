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

export const yyyy: DateFormatter = date => `${date.getFullYear()}`.padStart(4, '0')
export const MM: DateFormatter = date => `${date.getMonth() + 1}`.padStart(2, '0')
export const dd: DateFormatter = date => `${date.getDate()}`.padStart(2, '0')
