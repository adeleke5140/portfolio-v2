import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug
    const { searchParams } = new URL(request.url)
    
    const title = searchParams.get('title') || 'Blog Post'
    const description = searchParams.get('description') || ''

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '60px',
              width: '100%',
              height: '100%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                color: '#6b7280',
                marginBottom: '20px',
                fontWeight: 500,
              }}
            >
              Kenny's Blog
            </div>
            <div
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: '#111827',
                lineHeight: 1.1,
                marginBottom: '30px',
              }}
            >
              {title}
            </div>
            {description && (
              <div
                style={{
                  fontSize: '28px',
                  color: '#4b5563',
                  lineHeight: 1.4,
                  marginBottom: '40px',
                }}
              >
                {description}
              </div>
            )}
            <div
              style={{
                fontSize: '20px',
                color: '#9ca3af',
                marginTop: 'auto',
              }}
            >
              kehinde.me
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    
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
            backgroundColor: '#f8fafc',
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#1f2937',
          }}
        >
          <div>Kenny's Blog</div>
          <div style={{ fontSize: '24px', marginTop: '20px', color: '#6b7280' }}>
            kehinde.me
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}