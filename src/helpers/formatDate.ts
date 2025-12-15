import { format, parseISO } from 'date-fns'

const formatDate = (date: string, dateFormat = 'd.LL.y') => {
  if (!date) return
  try {
    const formattedDate = format(parseISO(date), dateFormat)
    return formattedDate
  } catch (err) {
    console.error(err)
    console.error('Affected Date', date)
    return format(new Date(), 'LLL d, yyyy')
  }
}

export { formatDate }
