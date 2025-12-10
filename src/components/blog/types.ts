export type RateLimitResponse = {
  limit: number
  remaining: number
  reset: number
  resetAt: string
}
