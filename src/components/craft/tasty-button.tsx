import { cn } from '@/lib/utils'
import { nunito } from './split-to-edit/split-to-edit'

export const TastyButton = () => {
  return (
    <div className="flex gap-2">
      <button
        style={{
          fontFamily: 'Nunito',
        }}
        className={cn('craft-button ', nunito.className)}
      >
        Click me
      </button>{' '}
      <button
        style={{
          fontFamily: 'Nunito',
        }}
        className={cn('destructive', nunito.className)}
      >
        Delete Item
      </button>
    </div>
  )
}
