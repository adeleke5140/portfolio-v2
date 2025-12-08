import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const POSTS_DIRECTORY = path.join(process.cwd(), 'src/app/blog/posts')

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    // Try both .md and .mdx extensions
    const mdPath = path.join(POSTS_DIRECTORY, `${slug}.md`)
    const mdxPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`)

    let fullPath: string | null = null

    if (fs.existsSync(mdPath)) {
      fullPath = mdPath
    } else if (fs.existsSync(mdxPath)) {
      fullPath = mdxPath
    }

    if (!fullPath) {
      return NextResponse.json(
        { error: `Post not found: ${slug}` },
        { status: 404 }
      )
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return NextResponse.json({
      slug,
      content,
      metadata: {
        title: data.title || slug,
        description: data.description || '',
        date: data.date || '',
        status: data.status || 'unknown',
        tag: data.tag || '',
        language: data.language || '',
      },
    })
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return NextResponse.json(
      { error: 'Failed to read blog post' },
      { status: 500 }
    )
  }
}
