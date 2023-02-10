import { format, parseISO } from "date-fns";

const formatDate = (date: string) => {
    return format(parseISO(date), "LLLL d, yyyy")
}

export { formatDate}