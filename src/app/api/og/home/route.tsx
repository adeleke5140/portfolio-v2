/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              marginTop: 40,
              fontFamily: 'PPEditorialNew',
              fontWeight: '600',
              color: 'white',
              marginBottom: 10,
              fontSize: 40,
            }}
          >
            Kehinde Adeleke
          </div>
        </div>
      ),
      {
        width: 800,
        height: 400,
      }
    )
  } catch (error: unknown) {
    console.error(error)
    return new Response('Failed to generate OG image', { status: 500 })
  }
}
