import { format, parseISO } from 'date-fns'

const formatDate = (date: string) => {
  if (!date) return
  return format(parseISO(date), 'LLL d, yyyy')
}

export { formatDate }
