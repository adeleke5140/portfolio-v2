import { cookies } from 'next/headers'
import { nanoid } from 'nanoid'

const COOKIE_NAME = 'ken_assistant_user_id'

export async function getOrCreateUserId() {
  const cookieStore = await cookies()

  let userId = cookieStore.get(COOKIE_NAME)?.value

  if (!userId) {
    userId = nanoid()

    cookieStore.set({
      name: COOKIE_NAME,
      value: userId,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
  }

  return userId
}
