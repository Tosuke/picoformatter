import { format, yyyy, MM, dd } from '.'

console.log(format`${yyyy}-${MM}-${dd}`(new Date()))
