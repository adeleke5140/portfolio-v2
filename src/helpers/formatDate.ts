import { format, parseISO } from 'date-fns'

const formatDate = (date: string) => {
  if (!date) return
  try {
    const formattedDate = format(parseISO(date), 'LLL d, yyyy')
    return formattedDate
  } catch (err) {
    console.error(err)
    console.error('Affected Date', date)
    return format(new Date(), 'LLL d, yyyy')
  }
}

export { formatDate }
