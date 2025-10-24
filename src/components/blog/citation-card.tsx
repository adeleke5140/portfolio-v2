import Link from 'next/link'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface CitationCardProps {
  slug: string
  title: string
  description?: string
  date: string
  status: string
}

export const CitationCard = ({
  slug,
  title,
  description,
  date,
  status,
}: CitationCardProps) => {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        'block group p-3 rounded-lg border transition-all duration-200',
        'bg-white hover:bg-gray-50',
        'border-gray-200 hover:border-[var(--primary)]',
        'shadow-sm hover:shadow-md'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-gray-900 group-hover:text-[var(--primary)] transition-colors line-clamp-1">
            {title}
          </h4>
          {description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <time dateTime={date}>
              {format(new Date(date), 'MMM dd, yyyy')}
            </time>
            <span>•</span>
            <span className={cn(
              'px-2 py-0.5 rounded-full text-xs font-medium',
              status === 'completed' && 'bg-green-100 text-green-700',
              status === 'draft' && 'bg-yellow-100 text-yellow-700',
              status === 'archived' && 'bg-gray-100 text-gray-700'
            )}>
              {status}
            </span>
          </div>
        </div>
        <svg
          className="w-4 h-4 text-gray-400 group-hover:text-[var(--primary)] transition-colors flex-shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  )
}
