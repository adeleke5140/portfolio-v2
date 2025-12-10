export function UsageAlert({
  rateLimitRemaining,
}: {
  rateLimitRemaining: number
}) {
  const rateLimitError =
    rateLimitRemaining === 0
      ? 'Limit reached. Please try again tomorrow.'
      : null

  return (
    <div className="border mx-5 border-b-0 border-[#dcdcdc] h-8 pt-2 rounded-t-xl bg-inherit p-4">
      {rateLimitRemaining === 0 ? (
        <p className=" rounded-lg font-sans text-xs">{rateLimitError}</p>
      ) : (
        <p className="text-[12px] text-xs font-sans text-ken-grey">
          {rateLimitRemaining}{' '}
          {rateLimitRemaining === 1 ? 'message' : 'messages'} remaining today
        </p>
      )}
    </div>
  )
}
