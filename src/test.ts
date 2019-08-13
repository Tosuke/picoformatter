import { format, yyyy, MM, dd, HH, mm, ss, formatRelativeTime } from '.'

console.log(format`${yyyy}-${MM}-${dd}T${HH}:${mm}:${ss}`(new Date())) // --> 2019-08-12

console.log(formatRelativeTime({
  year: n => `${n} year(s) ago`,
  month: n => `${n} month(s) ago`,
  week: n => `${n} week(s) ago`,
  date: n => `${n} day(s) ago`,
  hours: n => `${n} hour(s) ago`,
  // minutes: n => `${n} minute(s) ago`,
  seconds: n => n < 5 ? 'just now' : `${n} second(s) ago`
}, new Date(), new Date(2019, 7, 13, 14, 11)))
