import { format, parseISO } from "date-fns";

const formatDate = (date: string) => {
  if (!date) return
  return format(parseISO(date), "LLLL d, yyyy")
}

export { formatDate }
